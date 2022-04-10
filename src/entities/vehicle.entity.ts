import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Max, Min, MaxLength, MinLength, IsInt, IsNotEmpty } from 'class-validator';

@Entity()
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @MaxLength(7, {message: 'Placa deve ter 7 caracteres'})
    @MinLength(7, {message: 'Placa deve ter 7 caracteres'})
    @IsNotEmpty({message: 'Placa é obrigatória'})
    @Column({ unique: true, length: 7, nullable: false })
    placa: string

    @MaxLength(17, {message: 'Chassi deve ter 17 caracteres'})
    @MinLength(17, {message: 'Chassi deve ter 17 caracteres'})
    @IsNotEmpty({message: 'Chassi é obrigatório'})
    @Column({ unique: true, length: 17, nullable: false })
    chassi: string

    @MaxLength(11, {message: 'RENAVAM deve ter 11 caracteres'})
    @MinLength(11, {message: 'RENAVAM deve ter 11 caracteres'})
    @IsNotEmpty({message: 'RENAVAM é obrigatório'})
    @Column({ unique: true, length: 11, nullable: false })
    renavam: string

    @MaxLength(50, {message: 'Modelo deve ter no máximo 50 caracteres'})
    @IsNotEmpty({message: 'Modelo é obrigatório'})
    @Column({ nullable: false })
    modelo: string
    
    @MaxLength(50, {message: 'Marca deve ter no máximo 50 caracteres'})
    @IsNotEmpty({message: 'Marca é obrigatória'})
    @Column({ nullable: false })
    marca: string

    @Min(1900, {message: 'Ano deve ser maior que 1900'})
    @Max(2100, {message: 'Ano deve ser menor que 2100'})
    @IsInt({message: 'Ano deve ser um número inteiro'})
    @IsNotEmpty({message: 'Ano é obrigatório'})
    @Column({ type: 'int', nullable: false })
    ano: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 
