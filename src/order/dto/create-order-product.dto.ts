import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';
export class CreateOrderProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do produto',
    example: 'c2c81d6f-269b-4a44-83d4-d9cf406ce21e',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade do produto',
    example: 1,
  })
  quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Observações do produto',
    example: 'Sem cebola',
  })
  description: string;
}
