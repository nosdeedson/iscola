import { Entity } from "typeorm";
import { GenericModel } from "../@shared/generis.model/generic.model";


@Entity('user')
export class UserModel extends GenericModel{

}