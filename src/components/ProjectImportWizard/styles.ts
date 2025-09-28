import { styled } from '../../styles';

export const WizardContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
});

export const UploadStep = styled('div', {
    border: '2px dashed $tertiaryPink',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',

    input: {
        display: 'none',
    },

    label: {
        cursor: 'pointer',
        color: '$primaryPink',
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
});

export const PreviewTable = styled('table', {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',

    'th, td': {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },

    th: {
        backgroundColor: '$background',
        color: '$primaryPink',
    },

    'input': {
        width: '100%',
        border: '1px solid #ccc',
        padding: '4px',
        borderRadius: '4px',
        '&:focus': {
            borderColor: '$primaryOrange',
            outline: 'none',
        }
    }
});

export const Actions = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
});

export const SaveButton = styled('button', {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '$primaryPink',
    color: '$white',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '$secondaryPink',
    },
    '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    }
});