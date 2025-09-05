
import * as DropdownHelper from '@radix-ui/react-hover-card'
import { styled } from '../../styles'

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '8px',
})

export const InputWrapper = styled('div', {
    position: 'relative',
    width: '100%',
})

export const IconContainer = styled('div', {
    position: 'absolute',
    left: '3%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$fontgreen',
    pointerEvents: 'none',
    zIndex: 1,
})

export const FieldInput = styled('input', {
    width: '100%',
    padding: '20px 35px',
    height: '15px',
    fontSize: '14px',
    color: '$fontgreen',
    border: 'none',
    borderBottom: '2px solid $primaryPink',
    backgroundColor: 'transparent',
    '&::placeholder': {
        color: 'rgba(190,219,196, 0.3)',
        fontWeight: '400',
        fontSize: '14px',
    },
    '&:focus': {
        outline: 'none',
    },

    variants: {
        hasIcon: {
            true: {
                paddingLeft: '45px',
            }
        }
    }
})

export const TextDesc = styled('span', {
    fontSize: '15px',
    fontWeight: '500',
    color: '$fontgreen',
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