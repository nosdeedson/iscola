import { FindUserOutPutDto } from "src/infrastructure/api/controllers/users/workers/find-user-dto/find-user-outPut-dto";

export abstract class FindGenericService {
    public abstract execute(id: string): Promise<any>;
}