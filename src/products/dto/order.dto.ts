import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';

export class OrderDto {
  @ApiProperty({ example: '2022-07-15' })
  readonly date: string;

  @ApiProperty({ example: 3 })
  readonly quantity: number;

  @ApiProperty({ example: '123A' })
  readonly code: string;

  @ApiProperty({ example: '62dac4a43f6360a9c2ddfe0b' })
  readonly userId: User;
}