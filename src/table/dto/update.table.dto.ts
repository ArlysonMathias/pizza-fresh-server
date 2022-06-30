import { PartialType } from '@nestjs/swagger';
import { CreateTableDto } from './create.table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  // @ApiProperty({
  //   description: 'Número da mesa a ser atualizado',
  //   example: 'Number: 2',
  // })
}
