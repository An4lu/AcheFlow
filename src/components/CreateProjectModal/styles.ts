import { styled } from '../../styles';

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

export const InfoText = styled('p', {
    color: '#666',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '1rem',
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