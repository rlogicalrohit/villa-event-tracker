import { IsNotEmpty, IsString } from "class-validator";

export class CreateMenuCategoryManagementDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

}
