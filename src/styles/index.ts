import { createStitches } from '@stitches/react'

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
} = createStitches({
    theme: {
        colors: {
            primaryPink: '#E4113F',
            secondaryPink: '#F46685',
            tertiaryPink: '#FAB3B5',
            primaryOrange: '#FF7F2A',
            secondaryOrange: '#F9AC39',
            tertiaryOrange: '#FFB885',
            beige: '#FBD79D',
            white: '#FEF9EC',
            lightdark: '#1F1E1F',
        },
        fonts: {
            Primary: 'Outfit, sans-serif',
            Achefont: 'Krona One, sans-serif',
            Second: 'Quicksand, sans-serif',
        },
    },
})