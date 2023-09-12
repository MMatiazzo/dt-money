import * as Dialog from '@radix-ui/react-dialog';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoDtMoney from '../../assets/logo-dt-money.svg';
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoDtMoney} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova Transação</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal></NewTransactionModal>
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
