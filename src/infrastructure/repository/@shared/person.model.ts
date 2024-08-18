import { Column } from "typeorm";
import { GenericModel } from "./generis.model/generic.model";


export abstract class Person extends GenericModel {
    
    @Column({
        nullable: false,
        name: 'birthday'
    })
    birthday: Date;
    
    @Column({
        nullable: false,
        name: 'full_name'
    })
    fullName: string;
}