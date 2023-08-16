import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { deleteBankAccount, updateBankAccount } from '../_repository';

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const bankAccount = await deleteBankAccount(params.id);

  return NextResponse.json(bankAccount);
}

export async function PUT(request: NextRequest) {
  const data: Prisma.BankAccountUpdateInput & { id: string } =
    await request.json();

  console.log('### data', data);

  if (data.id) {
    const newBankAccount = await updateBankAccount(data.id, { ...data });

    return NextResponse.json(newBankAccount);
  }

  return new Response('Bank account does not exist', {
    status: 404,
  });
}
