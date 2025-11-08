import { styled } from '../../styles';
import { SubmitButton as BaseSubmitButton } from '../Form/styles';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    marginTop: '$2',
});

export const ProjectList = styled('div', {
    maxHeight: '300px',
    overflowY: 'auto',
    border: '1px solid $borderDefault',
    borderRadius: '$md',
    padding: '$3',
    backgroundColor: '$bgPrimary',
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
});

export const ProjectItem = styled('label', {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    padding: '$2',
    borderRadius: '$sm',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    
    '&:hover': {
        backgroundColor: '$borderSubtle',
    },

    input: {
        width: '16px',
        height: '16px',
    },

    span: {
        fontSize: '$md',
        color: '$textPrimary',
    }
});

export const SelectActions = styled('div', {
    display: 'flex',
    gap: '$3',
    marginBottom: '$2',
});

export const SelectButton = styled('button', {
    background: 'none',
    border: 'none',
    color: '$brandPrimary',
    fontSize: '$sm',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '$1',

    '&:hover': {
        textDecoration: 'underline',
    }
});

export const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '$4',
});

export const ExportButton = styled(BaseSubmitButton, {});