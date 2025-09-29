import { styled } from '../../styles';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
});

export const CardGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
});

export const Card = styled('div', {
    backgroundColor: '$white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: '$primaryPink',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }
});

export const CardTitle = styled('h3', {
    fontSize: '16px',
    fontWeight: '500',
    color: '#666',
});

export const CardValue = styled('p', {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '$lightdark',
});

export const CompletedList = styled('ul', {
    listStyle: 'none',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const CompletedListItem = styled('li', {
    fontSize: '15px',
    color: '$lightdark',
    paddingLeft: '1rem',
    position: 'relative',
    '&::before': {
        content: "'✓'",
        color: '$primaryOrange',
        position: 'absolute',
        left: 0,
        fontWeight: 'bold',
    }
});