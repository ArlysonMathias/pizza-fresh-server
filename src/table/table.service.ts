import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create.table.dto';
import { UpdateTableDto } from './dto/update.table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  tables: Table[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findById(id: string): Promise<Table> {
    const record = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const data = { ...createTableDto };
    try {
      return await this.prisma.table.create({ data });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.findById(id);
    const data: Partial<Table> = { ...dto };

    return this.prisma.table.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.table.delete({
      where: { id },
    });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
