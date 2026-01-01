export abstract class CreateGenericService {
    public abstract execute(dto: any): Promise<any>;
}