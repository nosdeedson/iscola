import { ApiProperty } from "@nestjs/swagger";
import { UpdateClassDto } from "src/domain-services/class/update/udpate.class.dto";

export class UpdateSchoolgroupDto{
    @ApiProperty({description: 'id of schoolgroup'})
    id: string;

    @ApiProperty({description: 'new schoolgroup name'})
    className: string;

    @ApiProperty({description: 'new book name'})
    nameBook: string;

    toInput(): UpdateClassDto{
        return new UpdateClassDto(
            this.id,
            this.nameBook,
            this.className
        )
    }
}