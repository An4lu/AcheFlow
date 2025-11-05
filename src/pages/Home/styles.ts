import { styled } from "../../styles";

export const Container = styled('main', {
    padding: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
    height: '100%',
});

export const Header = styled('div', {
    flexShrink: 0,
});

export const DailyGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '$5',
    alignItems: 'start', 
});