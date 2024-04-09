import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export interface IUserRepository{

    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    remove(id: string): void;

}