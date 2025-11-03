import { styled } from '../../styles';

export const FiltersWrapper = styled('div', {
    padding: '1rem',
    backgroundColor: '$background',
    borderRadius: '8px',
    marginBottom: '1rem',
});

export const TogglesContainer = styled('div', {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    paddingBottom: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
});

export const CheckboxGroup = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
});

export const Checkbox = styled('input', {});

export const Label = styled('label', {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
});

export const ControlsContainer = styled('div', {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
});

export const FormGroup = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: '1 1 220px',
    minWidth: '220px',
});

export const Select = styled('select', {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontFamily: '$Primary',
    backgroundColor: 'white',
});

export const Input = styled('input', {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontFamily: '$primary',
    backgroundColor: 'white',
});