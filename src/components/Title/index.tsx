import type { ReactNode } from 'react'
import { Text } from './styles'
import type { CSS } from '@stitches/react'

interface TitleProps {
    children: ReactNode
    css?: CSS
}

export const Title = ({ children, css }: TitleProps) => {
    return <Text css={css}>{children}</Text>
}
