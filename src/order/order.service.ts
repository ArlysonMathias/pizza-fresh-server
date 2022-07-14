import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      products: {
        createMany: {
          data: dto.products.map((createOrderProductDto) => ({
            productId: createOrderProductDto.productId,
            quantity: createOrderProductDto.quantity,
            description: createOrderProductDto.description,
          })),
        },
      },
    };

    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          products: {
            select: {
              quantity: true,
              products: {
                select: {
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        table: {
          select: {
            number: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            products: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }
}
