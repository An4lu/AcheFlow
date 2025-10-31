import { styled } from "../../styles";

export const Container = styled('div', {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
})

export const Fundo = styled('main', {
    marginLeft: '200px',
    width: 'calc(100% - 200px)',
    minHeight: '100vh',
    backgroundColor: '$bgPrimary',
    padding: '$6',
});