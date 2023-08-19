import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createTransaction, findTransactions } from './_repository';

async function GET() {
  const transactions = await findTransactions();

  return NextResponse.json(transactions);
}

async function POST(request: NextRequest) {
  const data = await request.json();

  const newTransaction = await createTransaction({ ...data });

  return NextResponse.json(newTransaction);
}

export { GET, POST };
