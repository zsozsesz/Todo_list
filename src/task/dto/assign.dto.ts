import { IsNotEmpty, IsInt } from 'class-validator';
export class AssignDto {

    @IsNotEmpty()
    @IsInt()
    readonly taskId: number;

    @IsNotEmpty()
    @IsInt()
    readonly userId: number;
}
