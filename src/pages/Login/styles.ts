import { FileX } from "@phosphor-icons/react";
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
    fontSize: '2rem',
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
    gap: '30px',
})

export const Button = styled('button', {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1.5rem',
    border: 'none',
    borderRadius: '0.7rem',
    width: '100%',
    maxWidth: '400px',
    fontSize: '1rem',
    fontFamily: '$defaultFont',
    color: '$white',
    backgroundColor: '$primaryPink',
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    '&:hover': {
        backgroundColor: '$secondaryOrange',
        color: '$white',
    },
})
