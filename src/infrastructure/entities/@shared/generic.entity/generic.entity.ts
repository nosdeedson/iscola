import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";


export abstract class GenericEntity {
    
    @PrimaryColumn({ type: 'uuid', unique: true })
    id: string;

    @CreateDateColumn({
        nullable: false,
        name: 'created_at',
        type: 'timestamp with time zone'
    })
    createdAt: Date;

    @DeleteDateColumn({
        nullable: true,
        name: 'deleted_at',
        type: 'timestamp with time zone'
    })
    deletedAt: Date;

    @UpdateDateColumn({
        nullable: false,
        name: 'updated_at',
        type: 'timestamp with time zone'
    })
    updatedAt: Date;
}
