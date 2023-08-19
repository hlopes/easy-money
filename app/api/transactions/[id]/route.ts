import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';

import { deleteTransaction, updateTransaction } from '../_repository';

async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const transaction = await deleteTransaction(params.id);

  return NextResponse.json(transaction);
}

async function PUT(request: NextRequest) {
  const data: Prisma.TransactionUpdateInput & { id: string } =
    await request.json();

  if (data.id) {
    const newTransaction = await updateTransaction(data.id, { ...data });

    return NextResponse.json(newTransaction);
  }

  return new Response('Transaction does not exist', {
    status: 404,
  });
}

export { DELETE, PUT };
