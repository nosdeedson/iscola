import { FindUserOutPutDto } from "src/infrastructure/api/controllers/users/workers/find-user-dto/find-user-outPut-dto";

export abstract class FindGeneriService {
    public abstract execure(id: string): Promise<FindUserOutPutDto>;
}