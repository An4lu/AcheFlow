import { styled } from '../../styles';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6', // 2rem
});

export const CardGrid = styled('div', {
    display: 'grid',
    // Cria um grid responsivo que se ajusta ao tamanho da tela
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '$5', // 1.5rem
    // Alinha os itens ao topo de suas células para corrigir o desalinhamento
    alignItems: 'start',
});

export const Card = styled('div', {
    backgroundColor: '$bgTertiary', // $white -> $bgTertiary
    padding: '$5', // 1.5rem
    borderRadius: '$md', // 8px
    boxShadow: '$shadows.small', // Sombra hardcoded removida
    display: 'flex',
    flexDirection: 'column',
    gap: '$2', // 0.5rem
    color: '$brandPrimary', // $primaryPink -> $brandPrimary
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    // Garante que o card ocupe a altura total necessária
    height: '100%',

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '$shadows.medium', // Sombra hardcoded removida
    }
});

export const Card2 = styled('div', {
    display: 'flex',
    alignItems: 'normal',
    gap: '$2',
});

export const ChartContainer = styled(Card, {
    gridColumn: 'span 1',
    '@media (min-width: 1024px)': {
        gridColumn: 'span 2',
    },
});

export const CardTitle = styled('h3', {
    fontSize: '16px',
    fontWeight: '500',
    color: '$textSecondary', // Cor hardcoded removida
    marginBottom: '$2', // 0.5rem
});

export const CardValue = styled('p', {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '$textPrimary', // $lightdark -> $textPrimary
});

export const CompletedList = styled('ul', {
    listStyle: 'none',
    marginTop: '$2', // 0.5rem
    display: 'flex',
    flexDirection: 'column',
    gap: '$2', // 0.5rem
});

export const CompletedListItem = styled('li', {
    fontSize: '15px',
    color: '$textPrimary', // $lightdark -> $textPrimary
    paddingLeft: '$4', // 1rem
    position: 'relative',
    '&::before': {
        content: "'✓'",
        color: '$brandSecondary', // $primaryOrange -> $brandSecondary
        position: 'absolute',
        left: 0,
        fontWeight: 'bold'
    }
});

export const OverdueList = styled('ul', {
    listStyle: 'none',
    marginTop: '$2', // 0.5rem
    display: 'flex',
    flexDirection: 'column',
    gap: '$2', // 0.5rem
});

export const OverdueListItem = styled('li', {
    fontSize: '15px',
    color: '$danger', // Cor hardcoded removida
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'space-between',
    'span': {
        fontWeight: 'normal',
        color: '$textMuted', // Cor hardcoded removida
    }
});