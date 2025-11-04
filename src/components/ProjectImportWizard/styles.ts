import { styled } from '../../styles';

export const WizardContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$5', // 1.5rem
});

export const UploadStep = styled('div', {
    border: '2px dashed $brandTertiary', // $tertiaryPink -> $brandTertiary
    padding: '$6', // 2rem
    borderRadius: '$md', // 8px
    textAlign: 'center',
    backgroundColor: '$bgSecondary',

    input: {
        display: 'none',
    },

    label: {
        cursor: 'pointer',
        color: '$brandPrimary', // $primaryPink -> $brandPrimary
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
});

export const PreviewTable = styled('table', {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '$4', // 1rem

    'th, td': {
        border: '1px solid $borderDefault', // Cor hardcoded removida
        padding: '$2', // 8px
        textAlign: 'left',
    },

    th: {
        backgroundColor: '$bgPrimary', // $background -> $bgPrimary
        color: '$brandPrimary', // $primaryPink -> $brandPrimary
        padding: '$3',
    },

    'input': {
        width: '100%',
        border: '1px solid $borderDefault', // Cor hardcoded removida
        padding: '$1', // 4px
        borderRadius: '$sm', // 4px
        fontFamily: '$primary',
        '&:focus': {
            borderColor: '$brandSecondary', // $primaryOrange -> $brandSecondary
            outline: '1px solid $brandSecondary',
        }
    }
});

export const Actions = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '$4', // 1rem
    marginTop: '$4', // 1rem
});

export const SaveButton = styled('button', {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '$sm', // 4px
    backgroundColor: '$brandPrimary', // $primaryPink -> $brandPrimary
    color: '$bgTertiary', // $white -> $bgTertiary
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '$brandPrimaryHover', // HOVER CORRIGIDO
    },
    '&:disabled': {
        backgroundColor: '$textMuted', // Cor hardcoded removida
        cursor: 'not-allowed',
    }
});