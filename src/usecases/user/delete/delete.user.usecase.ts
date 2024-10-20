import { UserRepositoryInterface } from "src/domain/user/user.repository.interface";

export class DeleteUserUseCase{

    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface){
        this.userRepository = userRepository;
    }

    async execute(id: string){
        await this.userRepository.delete(id);
    }

}