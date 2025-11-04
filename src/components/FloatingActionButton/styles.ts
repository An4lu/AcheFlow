import { styled } from '../../styles';

export const FabContainer = styled('div', {
    position: 'fixed',
    bottom: '$6', // 2rem
    right: '$6', // 2rem
    zIndex: 1050,
});

export const FabButton = styled('button', {
    width: '60px',
    height: '60px',
    borderRadius: '$full', // 50%
    backgroundColor: '$brandPrimary', // $primaryPink -> $brandPrimary
    color: '$bgTertiary', // $white -> $bgTertiary
    border: 'none',
    boxShadow: '$shadows.medium', // Sombra hardcoded removida
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s',

    '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: '$brandPrimaryHover', // HOVER CORRIGIDO
    },
});

export const FabMenu = styled('div', {
    position: 'absolute',
    bottom: '70px', // 60px + 10px (gap aproximado)
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4', // 1rem
});

export const FabMenuItem = styled('button', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    borderRadius: '$md', // 8px
    border: 'none',
    backgroundColor: '$bgTertiary', // $white -> $bgTertiary
    color: '$brandPrimary', // $primaryPink -> $brandPrimary
    boxShadow: '$shadows.small', // Sombra hardcoded removida
    cursor: 'pointer',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    fontSize: '15px',
    transition: 'background-color 0.2s, transform 0.2s',

    '&:hover': {
        backgroundColor: '$bgPrimary', // $background -> $bgPrimary
        transform: 'translateX(-5px)',
    }
});