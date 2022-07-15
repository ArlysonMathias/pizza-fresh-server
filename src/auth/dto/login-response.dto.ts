import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IkFybHlzb24iLCJpYXQiOjE2NTc4NDU1NzcsImV4cCI6MTY1NzkzMTk3N30.BvhnJBLUIcjUB9Y2pWq4Md88DLRSnEGMHyfa2e30cpE',
  })
  token: string;

  @ApiProperty({
    description: 'Dados autenticados do usuário',
  })
  user: User;
}
