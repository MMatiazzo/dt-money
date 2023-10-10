import { useContextSelector } from 'use-context-selector';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm/intex';
import {
	PriceHighlight,
	TransactionsContainer,
	TransactionsTable,
} from './styles';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFomatter } from '../../utils/formatters';

export function Transactions() {
	const transactions = useContextSelector(TransactionsContext, (context) => {
		return context.transactions;
	});

	return (
		<div>
			<Header />
			<Summary />
			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map(
							({ id, description, type, category, price, createdAt }) => {
								return (
									<tr key={id}>
										<td width="50%">{description}</td>
										<td>
											<PriceHighlight variant={type}>
												{type === 'outcome' && '- '}
												{priceFomatter.format(price)}
											</PriceHighlight>
										</td>
										<td>{category}</td>
										<td>{dateFormatter.format(new Date(createdAt))}</td>
									</tr>
								);
							}
						)}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
