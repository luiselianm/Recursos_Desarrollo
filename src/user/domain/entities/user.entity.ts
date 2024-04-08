import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text',{
        unique: true
    })
    email: string;

    @Column('date')
    birthDate: string;

    @Column('text')
    gender: string;
}
