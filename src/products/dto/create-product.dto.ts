import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ 
        example: 'Laptop HP 5012',
      })
      @IsNotEmpty()
      readonly name: string;
  
      @ApiProperty({ example: 1300 })
      @IsNumber()
      readonly price: number;
  
      @ApiProperty({
        example:
          'Laptop HP de última generación en procesador i9...',
      })
      @IsNotEmpty()
      readonly description: string;

      @ApiProperty({ example: ['Laptop', 'HP'] }) 
      readonly categories: string[];
}
