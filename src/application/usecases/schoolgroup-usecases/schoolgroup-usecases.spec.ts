import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClassService } from '../../../application/services/class/create/create.class.service';
import { CreateWorkerService } from '../../../application/services/worker/create/create.worker.service';
import { DeleteClassService } from '../../../application/services/class/delete/delete.class.service';
import { FindClassDto } from "../../../application/services/class/find/find.class.dto";
import { FindClassService } from '../../../application/services/class/find/find.class.service';
import { FindAllClassDto } from '../../../application/services/class/findAll/findAll.class.dto';
import { FindAllClassService } from '../../../application/services/class/findAll/findAll.class.service';
import { UpdateClassService } from '../../../application/services/class/update/update.class.service';
import { RepositoryFactoryService } from '../../../infrastructure/factory/repositiry-factory/repository-factory.service';
import { setEnv } from '../../../infrastructure/__mocks__/env.mock';
import { MockSchoolgroupDto } from '../../../infrastructure/__mocks__/mock-schoolgroup-dto';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DataBaseConnectionModule } from '../../../infrastructure/data-base-connection/data-base-connection.module';
import { ClassEntity } from '../../../infrastructure/entities/class/class.entity';
import { CreateSchoolgroupDto } from '../../../infrastructure/api/controllers/schoolgroup/create-schoolgroup-dto';
import { UpdateSchoolgroupDto } from '../../../infrastructure/api/controllers/schoolgroup/update-schoolgroup-dto';
import { SchoolgroupUseCases } from './schoolgroup-usecases';
import { WorkerEntity } from '../../../infrastructure/entities/worker/worker.entity';
import { RoleEnum } from '../../../domain/worker/roleEnum';


describe('SchoolgroupUsecaseService', () => {
  let service: SchoolgroupUseCases;
  let module: TestingModule
  let input: any;
  beforeEach(async () => {
    input = {
      classCode: undefined,
      nameBook: "book name",
      name: "teste",
      scheduleDto: {
        dayOfWeeks: [
          "Monday",
          "Tuesday",
        ],
        times: { 'Monday': '08:00', 'Tuesday': '09:00' },
      },
    };
    setEnv();
    module = await Test.createTestingModule({
      imports: [DataBaseConnectionModule],
      providers: [SchoolgroupUseCases, RepositoryFactoryService],
    }).compile();

    service = module.get<SchoolgroupUseCases>(SchoolgroupUseCases);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("create SchoolGroup", () => {

    it('should create a schoolgroup', async () => {
      let dto = MockSchoolgroupDto.dtoToCreate();

      const createClass = jest.spyOn(CreateClassService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve());
      const createTeacher = jest.spyOn(CreateWorkerService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve(WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER, true))));

      const toInput = jest.spyOn(CreateSchoolgroupDto.prototype, 'toInput')
        .mockReturnValueOnce(input)

      expect(await service.create(dto)).toBe(void 0);
      expect(createClass).toHaveBeenCalledTimes(1);
      expect(createClass).toHaveBeenCalledWith(input);
      expect(toInput).toHaveBeenCalledTimes(1);
      expect(createTeacher).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      let dto = MockSchoolgroupDto.dtoToCreateCausingException();
      const createTeacher = jest.spyOn(CreateWorkerService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve(WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER, true))));

      const createClass = jest.spyOn(CreateClassService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.reject(new BadRequestException("Test")));
      const toInput = jest.spyOn(CreateSchoolgroupDto.prototype, 'toInput')
        .mockReturnValueOnce(input)

      try {
        await service.create(dto)
      } catch (error) {
        expect(error).toBeDefined();
        expect(createClass).toHaveBeenCalledTimes(1);
        expect(createClass).toHaveBeenCalledWith(input);
        expect(toInput).toHaveBeenCalledTimes(1);
        expect(createTeacher).toHaveBeenCalledTimes(1);
      }
    });
    
  });


  describe('find', () => {
    it('should find a schoolgroup', async () => {
      const id = "1";
      const classEntity = ClassEntity.toClassEntity(DomainMocks.mockSchoolGroup());
      const mockResult = FindClassDto.toDto(classEntity);
      const find = jest.spyOn(FindClassService.prototype, 'execute')
        .mockImplementationOnce(async () => await Promise.resolve(mockResult));

      const result = await service.find(id);
      expect(result).toEqual(mockResult);
      expect(find).toHaveBeenCalledTimes(1);
      expect(find).toHaveBeenCalledWith(id);
    });

    it('should throw an error', async () => {
      const id = "1";
      const find = jest.spyOn(FindClassService.prototype, 'execute')
        .mockRejectedValue(new BadRequestException("Test"));

      await expect( service.find(id)).rejects.toThrow();
      expect(find).toHaveBeenCalledTimes(1);
      expect(find).toHaveBeenCalledWith(id);
      
    });

  });

  describe('findAll', () => {
    it('should find all schoolgroups', async () => {
      const id = "1";
      const classEntity = ClassEntity.toClassEntity(DomainMocks.mockSchoolGroup());
      const classEntity1 = ClassEntity.toClassEntity(DomainMocks.mockSchoolGroup());
      const mockResults = new FindAllClassDto([classEntity, classEntity1]);
      const findAll = jest.spyOn(FindAllClassService.prototype, 'execute')
        .mockResolvedValue( mockResults);

      const result = await service.findAll();
      expect(result).toEqual(mockResults);
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(result.all.length).toBe(2);
    });

    it('should fin anything', async () => {
      const mockResult = new FindAllClassDto([]);
      const findAll = jest.spyOn(FindAllClassService.prototype, 'execute')
        .mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(result.all.length).toBe(0);
      expect(result).toEqual(mockResult);
    });

  });

  describe('delete', () => {
    it('should delete a schoolgroup', async () => {
      const id = "1";
      const deleteService = jest.spyOn(DeleteClassService.prototype, 'execute')
        .mockImplementationOnce( async () => await Promise.resolve(void 0));

      await service.delete(id);
      expect(deleteService).toHaveBeenCalledTimes(1);
      expect(deleteService).toHaveBeenCalledWith(id);
    });
  });


  describe('update', () => {

    it('should update a schoolgroup', async () => {
      const id = "1";
      const dto = new UpdateSchoolgroupDto();
      dto.id= id;
      dto.nameBook = "bookName";
      dto.className = "className";
      const update = jest.spyOn(UpdateClassService.prototype, 'execute')
        .mockImplementationOnce(async () => await Promise.resolve(void 0));
      const input = dto.toInput();

      await service.update(dto);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(input);
    });

    it('should throw an error', async () => {
      const id = "1";
      const dto = new UpdateSchoolgroupDto() 
      dto.id = id;
      dto.nameBook = "bookName";
      dto.className = "className";
      const update = jest.spyOn(UpdateClassService.prototype, 'execute')
        .mockRejectedValue(new BadRequestException("Test"));
      const input = dto.toInput();
      await expect(service.update(dto)).rejects.toThrow();
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(input);
    });

  });


});
