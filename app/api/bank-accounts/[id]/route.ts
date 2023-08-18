import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';

import { deleteBankAccount, updateBankAccount } from '../_repository';

async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const bankAccount = await deleteBankAccount(params.id);

  return NextResponse.json(bankAccount);
}

async function PUT(request: NextRequest) {
  const data: Prisma.BankAccountUpdateInput & { id: string } =
    await request.json();

  if (data.id) {
    const newBankAccount = await updateBankAccount(data.id, { ...data });

    return NextResponse.json(newBankAccount);
  }

  return new Response('Bank account does not exist', {
    status: 404,
  });
}

export { DELETE, PUT };
