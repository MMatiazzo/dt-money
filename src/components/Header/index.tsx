import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoDtMoney from '../../assets/logo-dt-money.svg';

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoDtMoney} alt="" />
				<NewTransactionButton>Nova Transação</NewTransactionButton>
			</HeaderContent>
		</HeaderContainer>
	);
}
