import { styled } from "../../styles";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
})

export const Logo = styled('h1', {
    fontFamily: '$Achefont',
    fontSize: '4rem',
    color: '$primaryPink',
})