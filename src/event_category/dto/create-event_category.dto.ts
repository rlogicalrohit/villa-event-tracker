import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateEventCategoryDto {

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    name: string;

}
