import { styled } from '../../styles';

// Exporta os estilos base do outro modal
export {
    FormContainer,
    FormGroup,
    Label,
    Input,
    Select,
    TextArea,
    SubmitButton
} from '../CreateTaskModal/styles';

export const ImportSection = styled('div', {
    margin: '1.5rem 0',
    padding: '1rem',
    border: '1px solid $tertiaryPink',
    borderRadius: '8px',
    backgroundColor: '$background'
});

export const ImportTitle = styled('h4', {
    marginBottom: '0.5rem',
    color: '#333'
});

export const UploadInput = styled('input', {
    display: 'block',
    marginTop: '0.5rem',
    fontSize: '14px',
});

export const Divider = styled('div', {
    textAlign: 'center',
    margin: '1.5rem 0',
    color: '#999',
    fontWeight: 'bold',
    '&::before, &::after': {
        content: '""',
        display: 'inline-block',
        width: '40%',
        margin: '0 10px',
        borderTop: '1px solid #ccc',
        transform: 'translateY(-4px)'
    }
});

// ADIÇÃO DOS ESTILOS FALTANTES
export const PreviewTable = styled('table', {
    width: '100%',
    marginTop: '1.5rem',
    borderCollapse: 'collapse',
    fontSize: '14px',
});

export const PreviewHeader = styled('th', {
    textAlign: 'left',
    padding: '8px',
    borderBottom: '2px solid $primaryPink',
    color: '#333',
});

export const PreviewRow = styled('tr', {
    '&:not(:last-child)': {
        borderBottom: '1px solid #eee',
    },
    'td': {
        padding: '8px',
    }
});

export const ActionCell = styled('td', {
    width: '250px',
});

export const DeleteButton = styled('button', {
    background: 'transparent',
    border: 'none',
    color: '#c53030', // Um tom de vermelho para indicar exclusão
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: '#FEE2E2', // Um fundo vermelho claro no hover
    },
});