import type { Prisma, PrismaClient } from "@prisma/client";

export type OrderWithDelivery = Awaited<ReturnType<typeof PrismaClient["order"]["findUniqueOrThrow"]>({
  include: { delivery: true };
})>>;
