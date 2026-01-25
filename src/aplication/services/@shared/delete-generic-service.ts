export abstract class DeleteGenericService {
    public abstract execute(id: string): Promise<void>;
}