import { styled } from '../../styles';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
});

export const CardGrid = styled('div', {
    display: 'grid',
    // Cria um grid responsivo que se ajusta ao tamanho da tela
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    // Alinha os itens ao topo de suas células para corrigir o desalinhamento
    alignItems: 'start',
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
    // Garante que o card ocupe a altura total necessária
    height: '100%',

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }
});

export const ChartContainer = styled(Card, {
    // Faz o gráfico ocupar duas colunas em telas maiores
    gridColumn: 'span 1',
    '@media (min-width: 1024px)': {
        gridColumn: 'span 2',
    },
});

export const CardTitle = styled('h3', {
    fontSize: '16px',
    fontWeight: '500',
    color: '#666',
    marginBottom: '0.5rem',
});

export const CardValue = styled('p', {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '$lightdark',
});

export const CompletedList = styled('ul', {
    listStyle: 'none',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const CompletedListItem = styled('li', {
    fontSize: '15px', color: '$lightdark', paddingLeft: '1rem', position: 'relative',
    '&::before': { content: "'✓'", color: '$primaryOrange', position: 'absolute', left: 0, fontWeight: 'bold' }
});

export const OverdueList = styled('ul', {
    listStyle: 'none',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const OverdueListItem = styled('li', {
    fontSize: '15px',
    color: '#c53030',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'space-between',
    'span': {
        fontWeight: 'normal',
        color: '#A0AEC0',
    }
});