import prisma from "../../dataBase/prismaClient";

interface IRequest {
    name: string;
    email:string;
    id: int;
}

function updateUser({ name, email, id }: IRequest) {
    try{
        const user = prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
            }
        })
    } catch (error => {
        response.statusCode = 400;
        
    });

    return response.json(user);
};


export default updateUser;