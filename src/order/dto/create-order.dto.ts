import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está criando o pedido',
    example: '1ff91478-70d0-42ec-83f2-63e1b1b6afbf',
  })
  userId: string;

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
