export interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    delete(id: string): Promise<T>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(entity: T): Promise<void>;
}
