import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
  const bankAccounts = await db
    .selectFrom('bank_accounts')
    .selectAll()
    .execute();

  return NextResponse.json(bankAccounts);
}
