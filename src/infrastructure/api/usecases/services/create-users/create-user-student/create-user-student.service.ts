import { Injectable } from '@nestjs/common';
import { CreateUsersService } from '../create-users.service';
import { StudentRepositoryInterface } from 'src/domain/student/student.repository.interface';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { DataSource } from 'typeorm';

export class CreateUserStudent extends CreateUsersService {

    private studentRepository: StudentRepositoryInterface;

    constructor(studentRepository: StudentRepository){
        super();
        this.studentRepository = studentRepository;
    }

    async createActor(dto: any): Promise<void> {
        // TODO 
        console.log('creating a student')
    }
}
