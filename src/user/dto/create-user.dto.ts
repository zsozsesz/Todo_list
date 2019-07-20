import { RoleType } from 'src/common/types/role.type';
import { IsIn, IsNotEmpty,  MaxLength, IsEmail } from 'class-validator';
export class CreateUserDto {

    @IsNotEmpty()
    @MaxLength(99)
    readonly name: string;

    @IsNotEmpty()
    @MaxLength(99)
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(99)
    readonly password: string;

    @IsNotEmpty()
    @MaxLength(99)
    readonly confirmPassword: string;

    @IsIn(['ADMIN', 'USER'])
    readonly role: RoleType;
}
