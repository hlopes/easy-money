import { prisma } from '@/lib/prisma';
import type { Category } from '@/prisma/client';

export default function getCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}
