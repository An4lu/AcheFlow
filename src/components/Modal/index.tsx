import { XCircleIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { Title } from '../Title';
import { CloseButton, ModalContent, ModalHeader, ModalOverlay } from './styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title css={{ fontSize: '24px' }}>{title}</Title>
                    <CloseButton onClick={onClose}>
                        <XCircleIcon size={24} weight="bold" />
                    </CloseButton>
                </ModalHeader>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}