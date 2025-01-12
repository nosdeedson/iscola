import { Body, Controller, Post } from '@nestjs/common';
import { UserUsecases } from '../../usecases/user-usecases/user-usecases';
import { CreateUserDto } from './create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Controller')
@Controller('users')
export class UserController {

    constructor(private usecases: UserUsecases) { }

    @ApiOperation({description: "Create an user"})
    @ApiResponse({status: 201, description: 'return 201 if everything ok'})
    @ApiResponse({status: '4XX', description: 'Return exception of 400 status if request has incorrect information'})    
    @Post()
    async create(@Body() dto: CreateUserDto): Promise<void> {
        await this.usecases.create(dto);
    }
}
