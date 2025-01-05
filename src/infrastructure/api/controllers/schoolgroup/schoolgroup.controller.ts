import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SchoolgroupDto } from './create-schoolgroup-dto';
import { SchoolgroupUsecases } from '../../usecases/schoolgroup-usecases/schoolgroup-usecases';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateSchoolgroupDto } from './update-schoolgroup-dto';

@ApiTags('Schoolgroup contoller')
@Controller('schoolgroup')
export class SchoolgroupController {

    constructor(private schoolgroupService: SchoolgroupUsecases){}
    
    @ApiOperation({description: 'Create a schoolgroup'})
    @ApiResponse({status: 201,})
    @ApiResponse({status: '4XX', description: 'Return status 400 when request has invalid information'})
    @Post()
    async create(@Body() dto: SchoolgroupDto): Promise<void>{
        await this.schoolgroupService.create(dto);
    }

    @ApiOperation({description: 'Delete a schoolgroup'})
    @ApiResponse({status: 204, description: 'if schoolgroup does not exist do anything', example: 'fcfca953-946f-40e9-a1ae-22775888583e'})
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>{
        await this.schoolgroupService.delete(id);
    }

    @ApiOperation({description: 'Find a schoolgroup'})
    @ApiResponse({status: 204, description: 'if schoolgroup does not exist do anything'})
    @Get(':id')
    async find(@Param('id') id: string){
        return await this.schoolgroupService.find(id);
    }

    @ApiOperation({description: 'Find all schoolgroup'})
    @ApiResponse({status: 204, description: 'If there is no schoolgroup return an empty array'})
    @Get()
    async findAll(){
        return await this.schoolgroupService.findAll();
    }

    @ApiOperation({description: 'Update schoolgroup'})
    @ApiResponse({status: 204, description: ''})
    @ApiResponse({status: '4XX', description: 'If schoolgroup not found throw exeception'})
    @Patch()
    async update(@Body() dto: UpdateSchoolgroupDto): Promise<void>{
        await this.schoolgroupService.update(dto);
    }

}
