export interface RepositoryInterface<T> {
    create(entity: T): Promise<T>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(entity: T): Promise<void>;
}