import { IsNotEmpty, IsString } from "class-validator";

export class CreatePositionManagementDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

}
