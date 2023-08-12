import { Insertable, Selectable, Updateable } from 'kysely';
import { BankAccounts } from 'kysely-codegen';

export type BankAccount = Selectable<BankAccounts>;
export type NewBankAccount = Insertable<BankAccounts>;
export type BankAccountUpdate = Updateable<BankAccounts>;
