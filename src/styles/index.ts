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
            // Paleta de Marca (Branding)
            brandPrimary: '#E4113F', // Rosa principal
            brandPrimaryHover: '#D0103A', // Tom mais escuro para hover
            brandSecondary: '#FF7F2A', // Laranja principal
            brandSecondaryHover: '#E67326',
            brandOrange: '#ffe2d2ff', // Laranja mais escuro
            brandTertiary: '#FAB3B5', // Rosa claro
            brandQuaternary: '#F46685', // Rosa muito claro

            // Paleta Semântica (Cores de UI)
            bgPrimary: '#F5F5F5', // Fundo principal da aplicação
            bgSecondary: '#FEF9EC', // Fundo de "cartões" (cards), modais, sidebar
            bgTertiary: '#FFFFFF', // Fundo branco puro (para contraste)

            textPrimary: '#1F1E1F', // Cor de texto principal (quase preto)
            textSecondary: '#525252', // Cor de texto para sub-títulos, descrições
            textMuted: '#9E9E9E', // Cor de texto desabilitado ou placeholders

            borderDefault: '#E0E0E0', // Borda padrão
            borderSubtle: '#F0F0F0', // Borda mais suave

            // Cores de Feedback
            success: '#2E7D32',
            danger: '#C62828',
            warning: '#F9A825',

            // --- ADICIONE ESTES APELIDOS (ALIASES) ---
            // Mapeia os nomes antigos que seus componentes usam para os novos nomes do tema
            primaryPink: '$brandPrimary',
            secondaryPink: '$brandPrimaryHover',
            tertiaryPink: '$brandTertiary',
            tertiaryOrange: '$brandOrange',
            secondaryOrange: '$brandSecondary',

            white: '$bgTertiary',
            background: '$bgPrimary',
            lightdark: '$textPrimary',
        },
        fonts: {
            primary: 'Outfit, sans-serif',
            brand: 'Krona One, sans-serif',
            secondary: 'Quicksand, sans-serif',
        },
        space: {
            1: '4px',
            2: '8px',
            3: '12px',
            4: '16px',
            5: '24px',
            6: '32px',
            7: '48px',
            8: '64px',
        },
        fontSizes: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '28px',
            '4xl': '32px',
        },
        radii: {
            sm: '4px',
            md: '8px',
            lg: '12px',
            full: '9999px',
        },
        shadows: {
            small: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            medium: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            large: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        },
    },
})