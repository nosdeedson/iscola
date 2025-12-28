import { AccessType } from "../../domain/user/access.type";
import { CreateWorkersDto } from "../api/controllers/users/workers/create-workers-dto/create-workers-dto";

export class MockCreateUsers {
    static toCreateWorker() {
        let dto = new CreateWorkersDto();
        dto.name = 'worker';
        dto.birthDate = '2025-02-03T12:00:00Z';
        dto.email = 'worker@email.com';
        dto.password = '1234';
        dto.accessType = AccessType.ADMIN;
        dto.classCode = "1234";
        dto.nickname = 'worker';
        return dto;
    }
}