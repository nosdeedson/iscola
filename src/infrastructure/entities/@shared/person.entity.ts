import { Column, Entity, TableInheritance } from "typeorm";
import { GenericEntity } from "./generic.entity/generic.entity";


@Entity('person')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class PersonEntity extends GenericEntity {
    
    @Column({
        nullable: true,
        name: 'birthday',
        type: 'timestamp with time zone'
    })
    birthday: Date;
    
    @Column({
        nullable: false,
        name: 'full_name',
        length: 250,
        type: 'varchar'
    })
    fullName: string;
}