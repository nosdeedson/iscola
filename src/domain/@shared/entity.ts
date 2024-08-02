export abstract class Entity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    constructor(id: string, createdAt: Date, updatedAt: Date, deletedAt: Date){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}