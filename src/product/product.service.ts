import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  // products: Product[] = []; Db em memoria

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const data = { ...dto };
    try {
      return await this.prisma.product.create({ data });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);
    const data: Partial<Product> = { ...dto };

    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.product.delete({
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
