import db from '@/lib/db';
import { BankAccount, BankAccountUpdate, NewBankAccount } from './_types';

export async function findBankAccountById(id: string) {
  return await db
    .selectFrom('bank_accounts')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function findBankAccount(criteria: Partial<BankAccount>) {
  let query = db.selectFrom('bank_accounts');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.name) {
    query = query.where('name', '=', criteria.name);
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at);
  }

  return await query.selectAll().execute();
}

export async function updateBankAccount(
  id: string,
  updateWith: BankAccountUpdate
) {
  await db
    .updateTable('bank_accounts')
    .set(updateWith)
    .where('id', '=', id)
    .execute();
}

export async function createBankAccount(bankAccount: NewBankAccount) {
  return await db
    .insertInto('bank_accounts')
    .values(bankAccount)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteBankAccount(id: string) {
  return await db
    .deleteFrom('bank_accounts')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
