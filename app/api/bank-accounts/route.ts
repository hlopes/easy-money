import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createBankAccount, findBankAccount } from './_repository';

async function GET() {
  const bankAccounts = await findBankAccount();

  return NextResponse.json(bankAccounts);
}

async function POST(request: NextRequest) {
  const data = await request.json();

  const newBankAccount = await createBankAccount({ ...data });

  return NextResponse.json(newBankAccount);
}

export { GET, POST };
