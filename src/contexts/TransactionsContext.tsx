import { ReactNode, useEffect, useState, useCallback } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

export interface ITransaction {
	id: number;
	description: string;
	type: 'income' | 'outcome';
	price: number;
	category: string;
	createdAt: string;
}

interface ITransactionContextType {
	transactions: ITransaction[];
	fetchTransactions: (query?: string) => Promise<void>;
	createTransaction: (data: ICreateTransactionInput) => Promise<void>;
}

interface ITransactionsProviderProps {
	children: ReactNode;
}

interface ICreateTransactionInput {
	description: string;
	price: number;
	category: string;
	type: 'income' | 'outcome';
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	const fetchTransactions = useCallback(async (query?: string) => {
		const response = await api.get('transactions', {
			params: {
				_sort: 'createdAt',
				_order: 'desc',
				q: query,
			},
		});

		setTransactions(response.data);
	}, []);

	const createTransaction = useCallback(
		async (data: ICreateTransactionInput) => {
			const { category, description, price, type } = data;
			const response = await api.post('transactions', {
				category,
				description,
				price,
				type,
				createdAt: new Date(),
			});

			setTransactions((state) => [response.data, ...state]);
		},
		[]
	);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				fetchTransactions,
				createTransaction,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
