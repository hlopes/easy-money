import { NextResponse } from 'next/server';

import { findBankAccount } from './_repository';

export async function GET(_: Request) {
  const bankAccounts = await findBankAccount();

  return NextResponse.json(bankAccounts);
}
