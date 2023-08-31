import { User } from '@prisma/client';
import { IUserDTO } from 'src/dto/user';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(userData: IUserDTO): Promise<User>;
    searchByEmail({ email }: IUserDTO): Promise<boolean>;
    searchUsers(): Promise<{
        id: string;
        email: string;
        name: string;
        birthYear: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteUser(id: string): Promise<boolean>;
}
