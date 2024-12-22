import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";

export class DeleteParentService{

    private parentRepository: ParentReporitoryInterface;

    constructor(parentRepository: ParentReporitoryInterface){
        this.parentRepository = parentRepository;
    }

    async execute(id: string){
        try {
            await this.parentRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

}