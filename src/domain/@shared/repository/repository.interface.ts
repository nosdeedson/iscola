export interface RepositoryInterface<T> {
    create(entity: T, relation?: T): Promise<void>;
    delete(id: string): Promise<T>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(entity: T): Promise<void>;
}