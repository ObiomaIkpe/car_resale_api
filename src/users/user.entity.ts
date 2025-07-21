import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string;

    @Column({default: true})
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    afterInsert() {
        console.log('now insert is over')
    }
}