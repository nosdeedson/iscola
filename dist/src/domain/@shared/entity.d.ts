import { Notification } from './notification/notification';
export declare abstract class Entity {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    notification?: Notification;
    constructor(id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    getId(): any;
    getCreatedAt(): any;
    getUpdatedAt(): any;
    getDeletedAt(): any;
}
