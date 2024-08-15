import { Column, Entity, PrimaryColumn } from "typeorm";


export abstract class GenericModel {
    
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column({
        nullable: false,
        name: 'created_at'
    })
    createdAt: Date;

    @Column({
        nullable: true,
        name: 'deleted_at'
    })
    deletedAt: Date;

    @Column({
        nullable: false,
        name: 'updated_at'
    })
    updatedAt: Date;
}
