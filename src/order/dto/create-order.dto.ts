import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Numero da mesa que fez o pedido',
    example: 1,
  })
  tableNumber: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os ids dos produtos',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
