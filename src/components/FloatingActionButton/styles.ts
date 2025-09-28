import { styled } from '../../styles';

export const FabContainer = styled('div', {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    zIndex: 1050,
});

export const FabButton = styled('button', {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '$primaryPink',
    color: '$white',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s',

    '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: '$secondaryPink',
    },
});

export const FabMenu = styled('div', {
    position: 'absolute',
    bottom: '70px',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

export const FabMenuItem = styled('button', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '$white',
    color: '$primaryPink',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    fontSize: '15px',
    transition: 'background-color 0.2s, transform 0.2s',

    '&:hover': {
        backgroundColor: '$background',
        transform: 'translateX(-5px)',
    }
});