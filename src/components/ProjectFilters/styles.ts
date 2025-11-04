import { styled } from '../../styles';

export const FiltersWrapper = styled('div', {
    padding: '$4',
    backgroundColor: '$bgTertiary',
    borderRadius: '$md',
    marginBottom: '$4',
    boxShadow: '$shadows.small',
});

export const TogglesContainer = styled('div', {
    display: 'flex',
    gap: '$5',
    alignItems: 'center',
    paddingBottom: '$4',
    marginBottom: '$4',
    borderBottom: '1px solid $borderDefault',
});

export const CheckboxGroup = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$2', // 0.5rem
});

export const Checkbox = styled('input', {});

export const Label = styled('label', {
    fontSize: '15px',
    fontWeight: '600',
    color: '$textPrimary',
    cursor: 'pointer',
});

export const ControlsContainer = styled('div', {
    display: 'flex',
    gap: '$4',
    flexWrap: 'wrap',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    flex: '1 1 220px',
    minWidth: '220px',
});

const baseInputStyles = {
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

export const Select = styled('select', baseInputStyles);

export const Input = styled('input', baseInputStyles);