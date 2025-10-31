import { styled } from '../../styles';

import { Select as BaseSelect } from '../Form/styles';

export const Select = styled(BaseSelect, {});

export const ImportSection = styled('div', {
    margin: '1.5rem 0',
    padding: '$4',
    border: '1px solid $borderDefault',
    borderRadius: '$md',
    backgroundColor: '$bgPrimary'
});

export const ImportTitle = styled('h4', {
    marginBottom: '$3',
    color: '$textPrimary',
    fontWeight: '600',
});

export const UploadInput = styled('input', {
    display: 'block',
    marginTop: '$2',
    fontSize: '$sm',
    color: '$textSecondary',
    '&::file-selector-button': {
        padding: '$2 $3',
        border: 'none',
        borderRadius: '$md',
        backgroundColor: '$brandPrimary',
        color: '$bgTertiary',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '$brandPrimaryHover',
        }
    }
});

export const Divider = styled('div', {
    textAlign: 'center',
    margin: '$5 0',
    color: '$textMuted',
    fontWeight: '600',
    fontSize: '$xs',
    textTransform: 'uppercase',

    '&::before, &::after': {
        content: '""',
        display: 'inline-block',
        width: '40%',
        margin: '0 10px',
        borderTop: '1px solid $borderDefault',
        transform: 'translateY(-4px)'
    }
});

export const PreviewTable = styled('table', {
    width: '100%',
    marginTop: '$4',
    borderCollapse: 'collapse',
    fontSize: '$sm',
});

export const PreviewHeader = styled('th', {
    textAlign: 'left',
    padding: '$3',
    borderBottom: '2px solid $brandPrimary',
    color: '$textPrimary',
    backgroundColor: '$bgSecondary',
});

export const PreviewRow = styled('tr', {
    '&:not(:last-child)': {
        borderBottom: '1px solid $borderDefault',
    },
    'td': {
        padding: '$2',
        verticalAlign: 'middle',
    }
});

export const ActionCell = styled('td', {
    width: '200px', // Espaço para o select
});

export const DeleteButton = styled('button', {
    background: 'transparent',
    border: 'none',
    color: '$danger',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '$1',
    borderRadius: '$full',
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: '$tertiaryPink',
    },
});