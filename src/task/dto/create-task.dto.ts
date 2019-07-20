import { IsNotEmpty,  MaxLength   } from 'class-validator';

export class CreateTaskDto {

    @IsNotEmpty()
    @MaxLength(99)
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly startDate: Date;

    @IsNotEmpty()
    readonly endDate: Date;
}
