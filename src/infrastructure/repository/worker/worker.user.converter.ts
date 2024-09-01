import { Worker } from "../../../domain/worker/worker";
import { UserConverter } from "../@shared/user-converter/user.converter.interface";
import { PersonModel } from "../@shared/person.model";
import { WokerModel } from "./worker.model";

export class WorkerUserconverter implements UserConverter<Worker>{

    converter(entity: Worker): PersonModel {
        return WokerModel.toWorkerModel(entity);
    }
    
}