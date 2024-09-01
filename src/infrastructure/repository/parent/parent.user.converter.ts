import { Parent } from "src/domain/parent/parent";
import { UserConverter } from "../@shared/user-converter/user.converter.interface";
import { ParentModel } from "./parent.model";

export class ParentUserConverter implements UserConverter<Parent>{

    converter(entity: Parent): ParentModel {
        return ParentModel.toParentModel(entity);
    }
    
}