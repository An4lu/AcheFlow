import { styled, keyframes } from '../../styles';

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const LoaderContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: '300px',
});

export const Spinner = styled('div', {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '5px solid $borderDefault',
    borderColor: '$brandPrimary transparent transparent transparent',
    animation: `${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
});