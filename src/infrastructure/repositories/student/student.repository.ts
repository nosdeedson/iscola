import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { StudentRepositoryInterface } from '../../../domain/student/student.repository.interface';
import { DataSource, QueryFailedError, Repository } from 'typeorm';


export class StudentRepository implements StudentRepositoryInterface{

    constructor(
        private studentRepository: Repository<StudentEntity>,
        private dataSource: DataSource
    ){}

    async create(entity: StudentEntity): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new QueryFailedError(null, null, error);
        }
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    find(id: string): Promise<StudentEntity> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<StudentEntity[]> {
        throw new Error('Method not implemented.');
    }
    update(entity: StudentEntity, id: string) {
        throw new Error('Method not implemented.');
    }

}