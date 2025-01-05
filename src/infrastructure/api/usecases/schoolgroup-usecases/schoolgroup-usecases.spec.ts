import { Test, TestingModule } from '@nestjs/testing';
import { SchoolgroupUseCases } from './schoolgroup-usecases';
import { DataBaseConnectionModule } from '../../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../../__mocks__/env.mock';
import { CreateClassService } from '../../../../domain-services/class/create/create.class.service';
import { CreateSchoolgroupDto, Schedule } from '../../controllers/schoolgroup/create-schoolgroup-dto';
import { MockSchoolgroupDto } from '../../../__mocks__/mock-schoolgroup-dto';
import { BadRequestException } from '@nestjs/common';



describe('SchoolgroupUsecaseService', () => {
  let service: SchoolgroupUseCases;
  let module: TestingModule
  let input;
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
        times: { 'Monday' : '08:00', 'Tuesday' : '09:00' },
      },
    };
    setEnv();
    module = await Test.createTestingModule({
      imports: [DataBaseConnectionModule],
      providers: [SchoolgroupUseCases],
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

  it('should create a schoolgroup', async () => {
    let dto = MockSchoolgroupDto.dtoToCreate();
    const create = jest.spyOn(CreateClassService.prototype, 'execute')
      .mockImplementationOnce(() => Promise.resolve());
    
    const toInput = jest.spyOn(CreateSchoolgroupDto.prototype, 'toInput')
      .mockReturnValueOnce(input)

    expect(await service.create(dto)).toBe(void 0);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith(input);
    expect(toInput).toHaveBeenCalledTimes(1);
  })

  it('should throw an error', async () => {
    let dto = MockSchoolgroupDto.dtoToCreateCausingException();
    const create = jest.spyOn(CreateClassService.prototype, 'execute')
      .mockImplementationOnce(() => Promise.reject(new BadRequestException("Test")));
    const toInput = jest.spyOn(CreateSchoolgroupDto.prototype, 'toInput')
      .mockReturnValueOnce(input)

    try {
      await service.create(dto)
    } catch (error) {
      expect(error).toBeDefined();
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(input);
      expect(toInput).toHaveBeenCalledTimes(1);
    }
  })



});
