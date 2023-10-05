import { ReactNode, createContext, useEffect, useState } from 'react';

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
}

interface ITransactionsProviderProps {
	children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	async function loadTransaction() {
		const response = await fetch('http://localhost:3333/transactions');
		const data = await response.json();

		setTransactions(data);
	}

	useEffect(() => {
		loadTransaction();
	}, []);
	return (
		<TransactionsContext.Provider
			value={{
				transactions,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
