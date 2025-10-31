import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: '0px',
        padding: '0rem',
        boxSizing: 'border-box',
        fontFamily: '$primary',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',

        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '$borderSubtle',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '$brandTertiary',
            borderRadius: '4px',

            '&:hover': {
                backgroundColor: '$brandPrimary',
            }
        },
    },

    body: {
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: '$bgPrimary',
        color: '$textPrimary',
    },

    'h1, h2, h3, h4, h5, h6': {
        color: '$textPrimary',
        fontWeight: '700',
    },

    'button': {
        fontFamily: '$primary',
        cursor: 'pointer',
    },

    'input, select, textarea': {
        fontFamily: '$primary',
        fontSize: '$sm',
    },

    img: {
        display: 'block',
        maxWidth: '100%',
    },
})