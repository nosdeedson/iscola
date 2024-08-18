import { v4 as uuidv4 } from 'uuid';
import { Notification } from './notification/notification';


export abstract class Entity {
    private id?: string;
    private createdAt?: Date;
    private updatedAt?: Date;
    private deletedAt?: Date;
    private notification?: Notification;

    constructor(id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date){
        this.id = id ? id :  uuidv4().toString() as string;
        this.createdAt = createdAt ? createdAt : new Date();
        this.updatedAt = updatedAt ? updatedAt : new Date();
        this.deletedAt = deletedAt;
        this.notification = new Notification();
    }

    getId(): any{
        return this.id;
    }

    getCreatedAt(): any{
        return this.createdAt;
    }

    getUpdatedAt(): any{
        return this.updatedAt;
    }

    getDeletedAt(): any{
        return this.deletedAt;
    }

    getNotification(): any{
        return this.notification;
    }
}