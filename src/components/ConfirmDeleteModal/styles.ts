import { styled } from '../../styles';
import { SubmitButton } from '../Form/styles'; // Reutiliza o estilo base do botão

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$4',
    textAlign: 'center',
    padding: '$4 0',
});

export const Message = styled('p', {
    fontSize: '$md',
    color: '$textSecondary',
    lineHeight: 1.6,
});

export const ButtonContainer = styled('div', {
    display: 'flex',
    gap: '$4',
    marginTop: '$5',
    maxWidth: '400px',
});

// Botão Cancelar (baseado no SubmitButton, mas com cor sutil)
export const CancelButton = styled(SubmitButton, {
    backgroundColor: '$borderDefault',
    color: '$textSecondary',
    '&:hover:not(:disabled)': {
        backgroundColor: '$borderDefault',
        opacity: 0.8,
    }
});

// Botão Confirmar (baseado no SubmitButton, mas com cor de perigo)
export const ConfirmButton = styled(SubmitButton, {
    backgroundColor: '$danger',
    '&:hover:not(:disabled)': {
        backgroundColor: '$danger',
        opacity: 0.8,
    }
});