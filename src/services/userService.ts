import IUserServiceInterface from "./interfaces/userServiceInterface";
import bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";
import crypto from "crypto";
import UserDTO, { SecureUser } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";
import { IAnnouncementRepository } from "../repositories/interfaces/announcementRepositoryInterface";


export class UserService implements IUserServiceInterface {
    private userRepository: IUserRepository;
    private announcementRepository: IAnnouncementRepository;

    constructor(iUserRepository: IUserRepository, iAnnouncementRepository: IAnnouncementRepository) {
        this.userRepository = iUserRepository;
        this.announcementRepository = iAnnouncementRepository;
    }

    async getById( id: number ): Promise<SecureUser> {
        const user = await this.verifyUserExist(id);
        if (!this.userActive(user)) throw new Error("Usuário inativo.");

        const { email, name, image  }: SecureUser = user;

        return { id, email, name, image };
    }

    async addUser({ name, email, password }: UserDTO): Promise<string> {

        if (email.indexOf("@") === -1 || !name || !email || password.length < 8 || password.length > 20 ) {
            throw new Error ("Algum campo inválido");
        }

        const secretPassword = bcrypt.hashSync(password, 8);

        const userExists = await this.userRepository.selectOne({ email });

        if (userExists) { 
            if (!this.userActive(userExists)) {
                const id = userExists.id
                await this.userRepository.update({ name, email, password: secretPassword, active: true, id });
                return "Bem vindo de volta " + email + "!";
            } else {
                throw new Error("Usuário ja cadastrado.");
            }
        }

        const msg = await this.userRepository.create({
          name,
          email,
          password: secretPassword,
        } as UserDTO);
        
        return msg;
    }

    async updateUser({ name, email, password }: UserDTO, newPassword: string, id: number): Promise<SecureUser> {
        const userExists = await this.verifyUserExist(id);

        if (!this.userActive(userExists)) throw new Error("Usuário inativo.");

        let secretPassword: string | null = null;
        if(newPassword){
            if (newPassword.length < 8 || newPassword.length > 20 ) {
                throw new Error ("A nova senha precisa ter entre 8 a 20 caracteres.");
            }

            if(!bcrypt.compareSync(password, userExists.password)) throw new Error("Senha atual incorreta.");
            secretPassword = bcrypt.hashSync(newPassword, 8);
        }

        if(email) {
            if(email.indexOf("@") === -1) throw new Error("E-mail incorreto.");
        }

        const user = await this.userRepository.update({ id, ...(name && { name }), ...(email && { email }), ...(secretPassword && { password: secretPassword as string }) });

        return user;
        }

    async deleteUser( id: number ): Promise<string> {
        const user = await this.verifyUserExist(id);

        if (!this.userActive(user)) throw new Error("Usuário já deletado.");

        const advertiserId = id;
        const announcementExist = await this.announcementRepository.selectOne({ advertiserId });
        
        if(announcementExist) throw new Error ("Usuário não pode ser deletado, pois possui anúncio(s) cadastrado(s).");

        const msg = await this.userRepository.delete( id );

        return msg;
    }

    async forgotPasswordUploadEmail (email: string): Promise<string> {
        const user = await this.userRepository.selectOne({ email });

        if (!user || !this.userActive(user)) throw new Error ("Usuário não encontrado.")

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const newPassword = crypto.randomBytes(4).toString("hex");

        await transport.sendMail({
            from: "Traveler <wesleyvc2110@gmail.com>",
            to: email,
            subject: "Recuperação de senha.",
            html: `<h3>Olá, tudo bem ${user.name}?</h3> 
            <p>Se você esqueceu sua senha do Traveler e tentou recuperar sua conta, aqui está sua nova senha: <b>${newPassword}<b/>.</p>
            <br/>
            <a href='https://traveler-io.netlify.app/'>Traveler<a/>
            <br/>
            <p><b>DICA:</b></p>
            <p>Você poderá redefiní-la no Traveler em seu perfil!<p/>
            <br/>
            <br/>
            Atenciosamente equipe Traveler.`
        });
        const passwordHash = bcrypt.hashSync(newPassword, 8);
            
        await this.userRepository.update({ id: user.id, password: passwordHash });

        return "Nova senha foi enviada para seu e-mail."
    }

    async verifyUserExist(id: number): Promise<UserDTO> {
        const userExists = await this.userRepository.selectOne({ id });

        if (!userExists) throw new Error("Usuário não encontrado.");

        return userExists;
    }

    userActive(user: UserDTO): boolean | undefined {
        const active = user.active;
        return active;
    }
}

// https://docs.google.com/forms/d/e/1FAIpQLSfOWybq0WTCMiwIbsxysWgIsFjkk4JyhpO2PCHkk8an6eYclA/viewform