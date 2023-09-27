import type { Category } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export default function getCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}
