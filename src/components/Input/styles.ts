import * as DropdownHelper from '@radix-ui/react-hover-card'
import { styled } from '../../styles'

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '$2',
})

export const InputWrapper = styled('div', {
    position: 'relative',
    width: '100%',
})

export const IconContainer = styled('div', {
    position: 'absolute',
    left: '$3',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$brandPrimary', 
    pointerEvents: 'none',
    zIndex: 1,
})

export const FieldInput = styled('input', {
    width: '100%',
    height: '48px',
    padding: '0 $4 0 45px',
    fontSize: '$md',
    color: '$textPrimary',
    border: '1px solid $borderDefault',
    borderRadius: '$md',
    backgroundColor: '$bgTertiary',

    '&::placeholder': {
        color: '$textMuted',
        fontWeight: '400',
        fontSize: '$sm',
    },
    '&:focus': {
        outline: '2px solid $brandPrimary',
        borderColor: '$brandPrimary',
    },

})

export const TextDesc = styled('span', {
    fontSize: '$sm',
    fontWeight: '500',
    color: '$textSecondary',
})

export const ForHelper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
})

const Trigger = styled(DropdownHelper.Trigger, {
    cursor: 'pointer',
})

const Content = styled(DropdownHelper.Content, {
    cursor: 'pointer',
    borderRadius: 4,
    padding: 4.5,
    color: '$gray200',
    fontSize: 13,
    backgroundColor: 'white',
    boxShadow: 'rgba(0.2, 0, 0.2, 0.2) 0px 1px 4px',
})

const HoverArrow = styled(DropdownHelper.Arrow, {
    fill: 'white',
})

const Root = styled(DropdownHelper.Root, {})
const Portal = styled(DropdownHelper.Portal, {})

export const DropdownH = {
    Root,
    Trigger,
    HoverArrow,
    Portal,
    Content,
}

export const HelperCard = styled(DropdownHelper.Content, {
    backgroundColor: '#ffffff',
    width: '217px',
    height: '165px',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
})