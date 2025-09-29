import { styled } from '../../styles';

export const DetailsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
});

export const DetailItem = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
});

export const Label = styled('span', {
    fontWeight: 'bold',
    color: '$primaryPink',
    fontSize: '14px',
});

export const Value = styled('span', {
    fontSize: '16px',
    color: '#333',
    paddingLeft: '0.5rem',
    borderLeft: '3px solid $tertiaryPink',
});