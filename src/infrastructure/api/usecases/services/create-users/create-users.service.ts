import { CreateUserDto } from "src/infrastructure/api/controllers/user/create-user-dto";
import { DataSource } from "typeorm";

export abstract class CreateUsersService {

    private userService: any;

    /**
     * Create the domain class which indicate de role of the user if (teacher, student, parent)
     * must be created first user need the Id of the actor to be created
     * @param dto 
     */
    async createActor(dto: CreateUserDto): Promise<void>{
        throw new Error("Method not implemented");
    }

    async createUser(dto: CreateUserDto): Promise<void>{
        // TODO 
        console.log("creating the user")
    };

}
