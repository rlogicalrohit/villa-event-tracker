import { IsString, IsNotEmpty } from 'class-validator';
export class CreateMenuGroupManagementDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}
