import {
  experimental_useOptimistic as useOptimistic,
  useCallback,
} from 'react';
import type { Transaction } from '@prisma/client';

import type { TransactionWithCategories } from '../types';

enum ActionTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

type AddTransaction = Pick<
  Transaction,
  'date' | 'value' | 'type' | 'notes' | 'bankAccountId'
>;

type UpdateTransaction = Pick<
  Transaction,
  'id' | 'date' | 'value' | 'type' | 'notes' | 'bankAccountId'
>;

type TransactionAction = {
  type: ActionTypes;
  payload: string | AddTransaction | Transaction;
};

type TransactionReducer = (
  state: TransactionWithCategories[],
  action: TransactionAction
) => TransactionWithCategories[];

function checkTransaction(
  obj: string | AddTransaction | Transaction
): obj is Transaction {
  return typeof obj === 'object' && 'id' in obj;
}

const transactionsReducer: TransactionReducer = (state, action) => {
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
    checkTransaction(action.payload)
  ) {
    const argTransaction = action.payload as Transaction;

    return [
      ...state.map((transaction) => {
        if (transaction.id === argTransaction.id) {
          return { ...argTransaction };
        }

        return transaction;
      }),
      {
        ...action.payload,
      },
    ];
  }

  if (action.type === ActionTypes.DELETE) {
    return state.filter((transaction) => transaction.id !== action.payload);
  }

  return state;
};

export default function useOptimisticTransactions(transactions: Transaction[]) {
  const [optimisticTransactions, dispatchOptimisticTransactions] =
    useOptimistic(transactions, transactionsReducer);

  const optimisticAddTransaction = useCallback(
    (transaction: AddTransaction) =>
      dispatchOptimisticTransactions({
        type: ActionTypes.ADD,
        payload: transaction,
      }),
    [dispatchOptimisticTransactions]
  );

  const optimisticUpdateTransaction = useCallback(
    (transaction: UpdateTransaction) =>
      dispatchOptimisticTransactions({
        type: ActionTypes.UPDATE,
        payload: transaction,
      }),
    [dispatchOptimisticTransactions]
  );

  const optimisticDeleteTransaction = useCallback(
    (id: string) =>
      dispatchOptimisticTransactions({ type: ActionTypes.DELETE, payload: id }),
    [dispatchOptimisticTransactions]
  );

  return {
    optimisticTransactions,
    optimisticAddTransaction,
    optimisticUpdateTransaction,
    optimisticDeleteTransaction,
  };
}
