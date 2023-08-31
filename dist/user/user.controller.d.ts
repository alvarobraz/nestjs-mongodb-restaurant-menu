import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { IUserDTO } from 'src/dto/user';
export declare class UserController {
    private readonly user;
    constructor(user: UserService);
    signupUser(userData: IUserDTO): Promise<UserModel>;
    searchByEmail(userData: IUserDTO): Promise<boolean>;
    searchUsers(): Promise<{
        id: string;
        email: string;
        name: string;
        birthYear: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
