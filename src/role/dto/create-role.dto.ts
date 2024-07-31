import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Role Name is required' })
    name: string;

    @IsNotEmpty({ message: 'PermissionIds is required' })
    permissionIds: number[]
}
