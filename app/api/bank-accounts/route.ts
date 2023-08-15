import { NextRequest, NextResponse } from 'next/server';

import { findBankAccount, createBankAccount } from './_repository';

export async function GET(_: Request) {
  const bankAccounts = await findBankAccount();

  return NextResponse.json(bankAccounts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const newBankAccount = await createBankAccount({ ...data });

  return NextResponse.json(newBankAccount);
}
