import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: '0px',
        padding: '0rem',
        boxSizing: 'border-box',
        fontFamily: '$Primary',
        '&::-webkit-scrollbar': {
            width: '5px',
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#BEBEBE',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d71871ff',
            borderRadius: '4px',
        },
    },

    'body, textarea, select': {
        '&::-webkit-scrollbar': {
            width: '2px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#ffffff',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BEBEBE',
            borderRadius: '4px',
        },
    },

    body: {
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
    },

    img: {
        display: 'block',
        maxWidth: '100%',
    },
})