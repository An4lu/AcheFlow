import { styled } from '../../styles';

export const FormContainer = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4', 
    marginTop: '$4',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2', 
});

export const Label = styled('label', {
    fontWeight: '600',
    color: '$textPrimary',
    fontSize: '$sm',
});

const baseInputStyles = {
    width: '100%',
    height: '40px',
    padding: '0 $3',
    borderRadius: '$md',
    border: '1px solid $borderDefault',
    fontFamily: '$primary',
    fontSize: '$sm',
    backgroundColor: '$bgTertiary',
    color: '$textPrimary',

    '&:focus': {
        borderColor: '$brandPrimary',
        outline: '2px solid $brandPrimary',
    },
    '&:disabled': {
        backgroundColor: '$bgPrimary',
        color: '$textMuted',
        cursor: 'not-allowed',
    }
};

export const Input = styled('input', baseInputStyles);

// <<< MUDANÇA: Adicionada regra para estilizar os <option> filhos
export const Select = styled('select', {
    ...baseInputStyles,
    '& option': {
        textTransform: 'capitalize',
    }
});
// <<< FIM DA MUDANÇA

export const TextArea = styled('textarea', { 
    ...baseInputStyles, 
    height: 'auto',
    padding: '$3', 
    resize: 'vertical',
    minHeight: '80px',
});

export const SubmitButton = styled('button', {
    padding: '$3 $4',
    border: 'none',
    borderRadius: '$md',
    backgroundColor: '$brandPrimary',
    color: '$bgTertiary',
    fontWeight: '600',
    fontSize: '$md',
    cursor: 'pointer',
    marginTop: '$4',
    transition: 'background-color 0.2s',
    
    '&:hover:not(:disabled)': {
        backgroundColor: '$brandPrimaryHover',
    },
    '&:disabled': {
        backgroundColor: '$textMuted',
        cursor: 'not-allowed',
    }
});