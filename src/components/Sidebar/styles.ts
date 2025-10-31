import { NavLink } from "react-router-dom";
import { styled } from "../../styles";

export const SidebarContainer = styled('div', {
    width: '200px',
    height: '100vh',
    backgroundColor: '$bgSecondary',
    borderRight: '1px solid $borderDefault',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
});

export const LogoContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '$6 0',
    flexShrink: 0,
});

export const ContentContainer = styled('ul', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    padding: '0 $4',
    listStyle: 'none',
});

const baseItemStyles = {
    fontSize: '$sm',
    fontWeight: '500',
    display: 'flex',
    gap: '$3',
    alignItems: 'center',
    color: '$brandTertiary',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '$2 $3',
    borderRadius: '$md',
    transition: 'all 0.2s ease',

    '&:hover': {
        color: '$brandPrimary',
        backgroundColor: '$brandOrange',
    },


    svg: {
        fontSize: '20px',
    }
};

export const Logo = styled('h1', {
    fontFamily: '$brand',
    fontWeight: '400',
    fontSize: '$2xl',
    color: '$brandPrimary',
})

export const SidebarItem = styled(NavLink, {
    ...baseItemStyles,

    '&.active': {
        color: '$brandPrimary',
        backgroundColor: '$tertiaryPink',
        fontWeight: '600',
    },
});

export const SidebarButton = styled('button', {
    ...baseItemStyles,
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
});

export const TextLink = styled('span', {
    fontSize: '$sm',
})

export const Div = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: '$4',
})