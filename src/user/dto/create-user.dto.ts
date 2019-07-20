import { RoleType } from 'src/common/types/role.type';

export class CreateUserDto {

    readonly name: string;

    readonly email: string;

    readonly password: string;

    readonly confirmPassword: string;

    readonly role: RoleType;

    avatar: string = 'upload';
}
