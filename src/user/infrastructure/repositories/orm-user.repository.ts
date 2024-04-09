import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";
import { UpdateUserDto } from "src/user/application/dto/update-user.dto";
import { User } from "src/user/domain/entities/user.entity";
import { IUserRepository } from "src/user/domain/repositories/user.repository.interface";

@Injectable()
export class OrmUserRepository implements IUserRepository {

    private readonly logger = new Logger('UserServices')

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = this.userRepository.create(createUserDto);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            this.handleDBExceptions(error)
        }
    }

    async findAll() {
        const users = await this.userRepository.find()
        return users.map(user => ({
            ...user
        }))
    }

    async findOne(id: string) {
        let user: User;

        user = await this.userRepository.findOneBy({ id: id })

        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload(updateUserDto);
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return this.findOne(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDBExceptions(error);
        }
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }

    private handleDBExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail)

        this.logger.error(error);
        throw new InternalServerErrorException('Ayuda!')
    }

}