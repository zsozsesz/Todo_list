import { RoleType } from 'src/common/types/role.type';
import { IsIn, MaxLength, IsEmail } from 'class-validator';
export class UpdateUserDto {

    @MaxLength(99)
    readonly name: string;

    @MaxLength(99)
    @IsEmail()
    readonly email: string;

    @IsIn(['ADMIN', 'USER'])
    readonly role: RoleType;
}
