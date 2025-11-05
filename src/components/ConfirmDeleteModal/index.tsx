import { Modal } from '../Modal';
import { Title } from '../Title';
import { Container, Message, ButtonContainer, CancelButton, ConfirmButton } from './styles';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, message }: ConfirmDeleteModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="">
            <Container>
                <Title css={{ fontSize: '$2xl' }}>{title}</Title>
                <Message>{message}</Message>
                <ButtonContainer>
                    <CancelButton onClick={onClose}>
                        Cancelar
                    </CancelButton>
                    <ConfirmButton onClick={onConfirm}>
                        Sim, Excluir
                    </ConfirmButton>
                </ButtonContainer>
            </Container>
        </Modal>
    );
}