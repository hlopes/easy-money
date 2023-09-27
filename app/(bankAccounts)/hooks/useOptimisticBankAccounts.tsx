import {
  experimental_useOptimistic as useOptimistic,
  useCallback,
} from 'react';
import type { BankAccount } from '@prisma/client';

enum ActionTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

type AddBankAccount = Pick<BankAccount, 'name' | 'balance' | 'date' | 'notes'>;

type UpdateBankAccount = Pick<
  BankAccount,
  'id' | 'name' | 'balance' | 'date' | 'notes'
>;

type BankAccountAction = {
  type: ActionTypes;
  payload: string | AddBankAccount | BankAccount;
};

type BankAccountReducer = (
  state: BankAccount[],
  action: BankAccountAction
) => BankAccount[];

function checkBankAccount(
  obj: string | AddBankAccount | BankAccount
): obj is BankAccount {
  return typeof obj === 'object' && 'id' in obj;
}

const bankAccountsReducer: BankAccountReducer = (state, action) => {
  if (action.type === ActionTypes.ADD && typeof action.payload === 'object') {
    return [
      ...state,
      {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  if (
    action.type === ActionTypes.UPDATE &&
    typeof action.payload === 'object' &&
    checkBankAccount(action.payload)
  ) {
    const argBankAccount = action.payload as BankAccount;

    return [
      ...state.map((bankAccount) => {
        if (bankAccount.id === argBankAccount.id) {
          return { ...argBankAccount };
        }

        return bankAccount;
      }),
      {
        ...action.payload,
      },
    ];
  }

  if (action.type === ActionTypes.DELETE) {
    return state.filter((bankAccount) => bankAccount.id !== action.payload);
  }

  return state;
};

export default function useOptimisticBankAccounts(bankAccounts: BankAccount[]) {
  const [optimisticBankAccounts, dispatchOptimisticBankAccount] = useOptimistic(
    bankAccounts,
    bankAccountsReducer
  );

  const optimisticAddBankAccount = useCallback(
    (bankAccount: AddBankAccount) =>
      dispatchOptimisticBankAccount({
        type: ActionTypes.ADD,
        payload: bankAccount,
      }),
    [dispatchOptimisticBankAccount]
  );

  const optimisticUpdateBankAccount = useCallback(
    (bankAccount: UpdateBankAccount) =>
      dispatchOptimisticBankAccount({
        type: ActionTypes.UPDATE,
        payload: bankAccount,
      }),
    [dispatchOptimisticBankAccount]
  );

  const optimisticDeleteBankAccount = useCallback(
    (id: string) =>
      dispatchOptimisticBankAccount({ type: ActionTypes.DELETE, payload: id }),
    [dispatchOptimisticBankAccount]
  );

  return {
    optimisticBankAccounts,
    optimisticAddBankAccount,
    optimisticUpdateBankAccount,
    optimisticDeleteBankAccount,
  };
}
