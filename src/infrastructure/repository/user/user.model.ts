import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { PersonModel } from "../@shared/person.model";


@Entity('user')
export class UserModel extends GenericModel{

    @Column({
        nullable: false,
        name: 'email'
    })
    email: string;

    @Column({
        nullable: false,
        name: 'password',
    })
    password: string;

    @OneToOne(() => PersonModel)
    @JoinColumn()
    person: PersonModel;
}