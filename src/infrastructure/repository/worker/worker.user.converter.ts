import { Worker } from "../../../domain/worker/worker";
import { UserConverter } from "../@shared/user-converter/user.converter.interface";
import { PersonModel } from "../@shared/person.model";
import { WorkerModel } from "./worker.model";
import { ClassModel } from "../class/class.model";

export class WorkerUserconverter implements UserConverter<Worker>{

    converter(entity: Worker, schooGroups?: ClassModel): PersonModel {
        return WorkerModel.toWorkerModel(entity, schooGroups[0]);
    }
    
}