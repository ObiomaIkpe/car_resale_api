import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @AfterInsert()
    afterInsert() {
        console.log('now insert is over')
    }
}