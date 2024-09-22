export interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(entity: T, id: string): Promise<void>;
}