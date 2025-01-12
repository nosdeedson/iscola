import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserStudentService } from './create-user-student.service';

describe('CreateUserStudentService', () => {
  let service: CreateUserStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserStudentService],
    }).compile();

    service = module.get<CreateUserStudentService>(CreateUserStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
