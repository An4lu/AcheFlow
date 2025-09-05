
import type { ReactElement } from 'react'
import { Container, DropdownH, FieldInput, ForHelper, TextDesc, InputWrapper, IconContainer } from './styles'
import type { CSS } from '@stitches/react'

interface PropInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  css?: CSS
  placeholder?: string
  title?: string
  icon?: ReactElement
  inputIcon?: ReactElement // Novo: ícone dentro do input
  hoverText?: string
  value?: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  readOnly?: boolean
  placeholderColor?: string // Nova prop para cor do placeholder (aceita qualquer cor)
}

export const Input: React.FC<PropInput> = ({
  type,
  css,
  placeholder,
  title,
  icon,
  inputIcon,
  hoverText,
  value,
  onChange,
  onClick,
  onFocus,
  onBlur,
  readOnly,
  placeholderColor,
  ...rest
}: PropInput) => {
  return (
    <Container>
      <ForHelper>
        <TextDesc>{title}</TextDesc>
        {icon && hoverText && (
          <DropdownH.Root>
            <DropdownH.Trigger asChild>{icon}</DropdownH.Trigger>
            <DropdownH.Portal>
              <DropdownH.Content side="right">
                {hoverText}
                <DropdownH.HoverArrow />
              </DropdownH.Content>
            </DropdownH.Portal>
          </DropdownH.Root>
        )}
      </ForHelper>
      <InputWrapper>
        {inputIcon && <IconContainer>{inputIcon}</IconContainer>}
        <FieldInput
          css={{
            ...css,
            '&::placeholder': placeholderColor ? { color: placeholderColor } : undefined
          }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          hasIcon={!!inputIcon}
          {...rest}
        />
      </InputWrapper>
    </Container>
  )
}