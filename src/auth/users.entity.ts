import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class AppUser {
    
    @PrimaryGeneratedColumn()
    id: string

    @Column({unique: true})
    email: string

    @Column({unique: true})
    nickname: string

    @Column()
    password: string

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string
}