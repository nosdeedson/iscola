import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SemesterUsecases } from '../../usecases/semester-usecases/semester-usecases';
import { CreateSemesteDto } from './create-semester-dto';
import { bool, boolean, string } from 'yup';

@ApiTags('Semester controller')
@Controller('semester')
export class SemesterController {

    constructor(private semesterUseCases: SemesterUsecases){}

    @ApiOperation({description: "Create a semester"})
    @ApiResponse({status: 201, description: 'return 201 if everything ok'})
    @ApiResponse({status: '4XX', description: 'Return exception of 400 status if request has incorrect information'})
    @Post()
    async create(@Body() dto: CreateSemesteDto): Promise<void>{
       await this.semesterUseCases.createSemester(dto);
    }

    @ApiOperation({description: "Delete academic semester", })
    @ApiResponse({status: 204, description: 'return 204 if everything ok or if the academic semester does not exist', example: "d90c017a-eabe-4cd5-9dd3-ea8e6c037bd6"})
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>{
        this.semesterUseCases.delete(id);
    }

    @ApiResponse({status: 200, description: 'if Academic Semester exist return it', example: 'd90c017a-eabe-4cd5-9dd3-ea8e6c037bd6'})
    @ApiResponse({status: '4XX', description: 'if Academic Semester does not exist return not found exception', example: 'd90c017a-eabe-4cd5-9dd3-ea8e6c037bd6'})
    @Get('/:id')
    async find(@Param('id') id: string): Promise<any>{
        return await this.semesterUseCases.find(id);
    }

    @ApiResponse({status: 200, description: 'Return all Academic semester', })
    @ApiResponse({status: '4XX', description: 'If there is no Academic semester return empty array',})
    @Get()
    async findAll(): Promise<any>{
        return await this.semesterUseCases.findAll();
    }

    @ApiResponse({status: 200, description: 'Return if exist or do anything if academic sementer does not exist', example: "d90c017a-eabe-4cd5-9dd3-ea8e6c037bd6"})
    @Patch()
    async update(
        @Param('id') id: string,
        @Query('actual') actual: boolean
    ){
        this.semesterUseCases.update(id, actual);
    }

}
