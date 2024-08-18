import { Entity } from "../@shared/entity";
export declare class Comment extends Entity {
    comment: string;
    idPersonHadDone: number;
    commentDate: Date;
    constructor(comment: string, idPersonHadDone: number, commentDate: Date, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getComment(): string;
    getIdPersonHadDone(): number;
    getCommentDate(): Date;
}
