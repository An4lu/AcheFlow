import { styled } from "../../styles";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
})

export const Logo = styled('h1', {
    fontFamily: '$Achefont',
    fontWeight: '400',
    fontSize: '3rem',
    color: '$primaryPink',
})

export const Esquerda = styled('div', {
    display: 'flex',
    flex: 1,
})

export const Img = styled('img', {
    maxWidth: '145%',
    minWidth: '145%',
    height: 'auto',
})

export const Direita = styled('div', {
    flex: 1,
    backgroundColor: '$background',
    width: '100%',
    height: '100%',
})

export const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: '50px',
})

export const Space = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
})

export const Input = styled('input', {
    padding: '12px 16px',
    border: '1px solid $border',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '16px',
    fontSize: '1rem',
    fontFamily: '$defaultFont',
    color: '$text',
    backgroundColor: '$inputBackground',
    '&:focus': {
        outline: 'none',
        borderColor: '$primary',
    },
})

export const Button = styled('button', {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '400px',
    fontSize: '1rem',
    fontFamily: '$defaultFont',
    color: '$text',
    backgroundColor: '$primaryPink',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '$secundaryPink',
    },
})
