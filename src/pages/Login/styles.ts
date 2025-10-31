import { styled } from "../../styles";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
})

export const Logo = styled('h1', {
    fontFamily: '$brand',
    fontWeight: '400',
    fontSize: '40px',
    color: '$brandPrimary',
})

export const Esquerda = styled('div', {
    display: 'none',
    flex: 1,

    '@media (min-width: 768px)': {
        display: 'block',
    }
})

export const Img = styled('img', {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})

export const Direita = styled('div', {
    flex: 1,
    backgroundColor: '$bgPrimary',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '$5',
})

export const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    gap: '$7',
})

export const Space = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    width: '100%',
})

export const Button = styled('button', {
    padding: '$3 $4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$2',
    marginTop: '$2',
    border: 'none',
    borderRadius: '$md',
    width: '100%',
    fontSize: '$md',
    fontWeight: '600',
    fontFamily: '$primary',
    color: '$bgTertiary',
    backgroundColor: '$brandPrimary',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',

    '&:hover:not(:disabled)': {
        backgroundColor: '$brandPrimaryHover',
    },
    '&:disabled': {
        opacity: 0.7,
        cursor: 'not-allowed',
    }
})

export const ErrorMessage = styled('p', {
    color: '$danger',
    fontSize: '$sm',
    fontFamily: '$primary',
    textAlign: 'center',
    marginTop: '-$2',
})