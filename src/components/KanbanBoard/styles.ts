import { styled } from '../../styles';

export const BoardContainer = styled('div', {
    display: 'flex',
    gap: '$4', // 1rem
    padding: '$4', // 1rem
    overflowX: 'auto',
    height: 'calc(100vh - 90px)',
});

export const ColumnContainer = styled('div', {
    width: '300px',
    backgroundColor: '$bgSecondary', // Alterado para $bgSecondary para combinar com a Sidebar
    borderRadius: '$md', // 8px
    padding: '$4', // 1rem
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
});

export const ColumnTitle = styled('h3', {
    fontSize: '1rem',
    fontWeight: '600',
    color: '$textPrimary', // $lightdark -> $textPrimary
    marginBottom: '$4', // 1rem
    paddingBottom: '$2', // 0.5rem
    borderBottom: '2px solid $brandTertiary', // $tertiaryPink -> $brandTertiary
});

export const TaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3', // 0.75rem
    overflowY: 'auto',
    flex: 1,
});

export const TaskCard = styled('div', {
    backgroundColor: '$bgTertiary', // $white -> $bgTertiary
    padding: '$4', // 1rem
    borderRadius: '$md', // 6px -> $md
    boxShadow: '$shadows.small', // Sombra hardcoded removida
    cursor: 'grab',
    transition: 'box-shadow 0.2s ease',

    '&:active': {
        cursor: 'grabbing',
        boxShadow: '$shadows.medium', // Sombra hardcoded removida
    },
});

export const TaskTitle = styled('p', {
    fontSize: '15px',
    color: '$textPrimary', // $lightdark -> $textPrimary
    fontWeight: '500',
});

export const TaskFooter = styled('div', {
    marginTop: '$4', // 1rem
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

export const TaskOwner = styled('span', {
    fontSize: '$xs', // 12px
    backgroundColor: '$brandSecondary', // $tertiaryOrange -> $brandSecondary
    color: '$bgTertiary', // $white -> $bgTertiary
    padding: '$1 $2', // 2px 8px
    borderRadius: '$full', // 12px -> $full
    fontWeight: 'bold',
});