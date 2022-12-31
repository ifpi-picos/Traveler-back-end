import IUserServiceInterface from "./interfaces/userServiceInterface";
import bcrypt from "bcryptjs";
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
        };

        const secretPassword = bcrypt.hashSync(password, 8);

        const userExists = await this.userRepository.selectOne({ email });

        if (userExists) { 
            if (!this.userActive(userExists)) {
                const id = userExists.id
                await this.userRepository.update({ name, email, password: secretPassword, active: true }, id);
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
    };

    async updateUser({ name, email, password }: UserDTO, id: number): Promise<SecureUser> {
        const userExists = await this.verifyUserExist(id);

        if (!this.userActive(userExists)) throw new Error("Usuário inativo.");

        const user = await this.userRepository.update({ name, email, password }, id);

        return user;
    };

    async deleteUser( id: number ): Promise<string> {
        const user = await this.verifyUserExist(id);

        if (!this.userActive(user)) throw new Error("Usuário já deletado.");

        const advertiserId = id;
        const announcementExist = await this.announcementRepository.selectOne({ advertiserId });
        
        if(announcementExist) throw new Error ("Usuário não pode ser deletado, pois possui anúncio(s) cadastrado(s).");

        const msg = await this.userRepository.delete( id );

        return msg;
    };

    async verifyUserExist(id: number): Promise<UserDTO> {
        const userExists = await this.userRepository.selectOne({ id });

        if (!userExists) throw new Error("Usuário não encontrado.");

        return userExists;
    };

    userActive(user: UserDTO): boolean | undefined {
        const active = user.active;
        return active;
    }
};

// https://docs.google.com/forms/d/e/1FAIpQLSfOWybq0WTCMiwIbsxysWgIsFjkk4JyhpO2PCHkk8an6eYclA/viewform