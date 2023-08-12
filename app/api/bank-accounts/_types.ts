import { Insertable, Selectable, Updateable } from 'kysely';

import { BankAccounts } from '@/lib/db.d';

export type BankAccount = Selectable<BankAccounts>;
export type NewBankAccount = Insertable<BankAccounts>;
export type BankAccountUpdate = Updateable<BankAccounts>;
