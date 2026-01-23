import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { StudentRepositoryInterface } from '../../../domain/student/student.repository.interface';
import { StudentEntity } from '../../../infrastructure/entities/student/student.entity';


export class StudentRepository implements StudentRepositoryInterface {

    constructor(
        private studentRepository: Repository<StudentEntity>,
        private dataSource: DataSource
    ) { }

    async create(entity: StudentEntity): Promise<StudentEntity> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            let result = await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new QueryFailedError(null, null, error);
        }
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(StudentEntity)
            .set({
                deletedAt: new Date(),
            })
            .where('id= :id', { id: id })
            .execute();
    }

    async find(id: string): Promise<StudentEntity> {
        return await this.studentRepository.findOne({
            where: { id: id },
            relations: {
                schoolGroup: true,
            }
        });
    }


    async findStudentsByNames(studentsNames: string[], parentsName: string[]): Promise<StudentEntity[]> {
        return await this.dataSource.createQueryBuilder(StudentEntity, 'student')
            .innerJoin('student.parentStudents', 'ps')
            .innerJoin('ps.parent', "parent")
            .where('student.fullName IN (:...names)', { names: studentsNames })
            .andWhere('parent.fullName IN (:...names)', { names: parentsName })
            .getMany();
    }

    async findAll(): Promise<StudentEntity[]> {
        return await this.studentRepository.find();
    }

    async update(entity: StudentEntity) {
        await this.studentRepository.save(entity);
    }

}