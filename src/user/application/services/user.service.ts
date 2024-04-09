import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";
import { UpdateUserDto } from "src/user/application/dto/update-user.dto";
import { OrmUserRepository } from "src/user/infrastructure/repositories/orm-user.repository";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: OrmUserRepository
    ) { }

    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto);
    }

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: string) {
        return this.userRepository.findOne(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto)
    }

    remove(id: string) {
        this.userRepository.remove(id);
    }

}