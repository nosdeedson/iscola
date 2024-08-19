import { Column, Entity, TableInheritance } from "typeorm";
import { GenericModel } from "./generic.model/generic.model";


@Entity('person')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class PersonModel extends GenericModel {
    
    @Column({
        nullable: false,
        name: 'birthday',
        type: 'timestamp with time zone'
    })
    birthday: Date;
    
    @Column({
        nullable: false,
        name: 'full_name'
    })
    fullName: string;
}