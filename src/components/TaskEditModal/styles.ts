import { styled } from '../../styles';


export const FormContainer = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const Label = styled('label', {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
});

const baseInputStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontFamily: '$primary',
    fontSize: '15px',
    backgroundColor: '$white',
    '&:focus': {
        borderColor: '$primaryPink',
        outline: '1px solid $primaryPink',
    }
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
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: '$secondaryPink',
    },
    '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    }
});

export const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '$4',
});

export const DeleteButton = styled('button', {
    padding: '$3 $4',
    border: 'none',
    borderRadius: '$md',
    backgroundColor: 'transparent',
    color: '$danger',
    fontWeight: '600',
    fontSize: '$sm',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    '&:hover:not(:disabled)': {
        backgroundColor: '$brandTertiary', 
    },

    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
});