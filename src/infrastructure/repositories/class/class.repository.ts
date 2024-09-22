import { ClassRepositoryInterface } from "../../../domain/class/class.repository.interface";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { DataSource, QueryFailedError, Repository } from "typeorm";


export class ClassRepository implements ClassRepositoryInterface {

    constructor(
        private classRepository: Repository<ClassEntity>,
        private dataSource: DataSource
    ) { }

    async create(entity: ClassEntity, relation?: ClassEntity): Promise<void> {
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
        } finally {
            await queryRunner.release();
        }
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(ClassEntity)
            .set({ deletedAt: new Date() })
            .where('id= :id', { id: id })
            .execute();
    }

    async find(id: string): Promise<ClassEntity> {
        let model = await this.classRepository.findOne({
            where: { id: id },
            relations: {
                students: true,
                teacher: true
            }
        });
        return model;
    }

    async findByClassCode(classCode: string): Promise<ClassEntity>{
        const model = this.classRepository.findOne({
            where: {classCode: classCode},
            relations:{
                students: true,
                teacher: true
            }
        });
        return model;
    }

    async findAll(): Promise<ClassEntity[]> {
        let all = await this.classRepository.find({
            relations: {
                students: true,
                teacher: true
            }
        })
        return all;
    }

    async update(entity: ClassEntity, id: string) {
        await this.dataSource.createQueryBuilder()
            .update(ClassEntity)
            .set({
                bookName : entity.bookName,
                className : entity.className,
                updatedAt: new Date()
            })
            .execute();
    }

}
