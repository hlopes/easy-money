import { NextResponse } from 'next/server';

import { deleteBankAccount } from '../_repository';

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const bankAccount = await deleteBankAccount(params.id);

  return NextResponse.json(bankAccount);
}
