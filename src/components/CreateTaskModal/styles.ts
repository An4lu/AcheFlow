import { styled } from '../../styles';

export const FormContainer = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const Label = styled('label', {
    fontWeight: 'bold',
    color: '#333',
});

const baseInputStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontFamily: '$Primary',
};

export const Input = styled('input', baseInputStyles);
export const Select = styled('select', baseInputStyles);
export const TextArea = styled('textarea', { ...baseInputStyles, resize: 'vertical' });

export const SubmitButton = styled('button', {
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '$primaryPink',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    '&:hover': {
        backgroundColor: '$secondaryPink',
    },
});