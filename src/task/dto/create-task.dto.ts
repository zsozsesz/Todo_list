export class CreateTaskDto {
    readonly name: string;
    readonly description: string;
    readonly startDate: Date;
    readonly endDate: Date;
}
