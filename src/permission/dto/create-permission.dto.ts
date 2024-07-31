import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @IsNotEmpty({ message: 'Permission Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Label is required' })
    label: string;
}
