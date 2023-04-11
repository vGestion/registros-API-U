import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  
   @ApiProperty()
  _id: string

  @ApiProperty() 
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  ci: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  residence: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  certificates:[
    {
      event: string;
      url: string;
    }]
  
}
