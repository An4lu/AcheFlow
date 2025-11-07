import { styled } from '../../styles';

export const DetailsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4', // 1rem
    marginTop: '$5', // 1.5rem
});

export const DetailItem = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$1', // 0.25rem
});

export const Label = styled('span', {
    fontWeight: '600', // 'bold' -> '600' (padrão do Form)
    color: '$brandPrimary', // $primaryPink -> $brandPrimary
    fontSize: '$sm', // 14px
});

export const Value = styled('span', {
    fontSize: '$md', // 16px
    color: '$textPrimary', // Cor hardcoded removida
    paddingLeft: '$2', // 0.5rem
    borderLeft: '3px solid $brandTertiary', // $tertiaryPink -> $brandTertiary
});

export const DeleteButton = styled('button', {
    width: '100%',
    padding: '$3 $4',
    marginTop: '$4',
    border: 'none',
    borderRadius: '$md',
    backgroundColor: '$dangerMuted',
    color: '$danger',
    fontWeight: '$medium',
    fontSize: '$sm',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$2',

    '&:hover': {
        backgroundColor: '$danger',
        color: '$white',
    },

    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
});