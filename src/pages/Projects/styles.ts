import { styled } from '../../styles';

export const Container = styled('main', {
  padding: '$6', // 2rem
  height: 'calc(100vh - ($6 * 2))', // Altura dinâmica baseada no padding
  display: 'flex',
  flexDirection: 'column',
  gap: '$5', // 1.5rem
});

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$4', // 1rem
  flexShrink: 0,
});

export const ActionButton = styled('button', {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '$md', // 8px
  backgroundColor: '$brandPrimary', // $primaryPink -> $brandPrimary
  color: '$bgTertiary', // $white -> $bgTertiary
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '15px',
  transition: 'background-color 0.2s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '$brandPrimaryHover', // HOVER CORRIGIDO
  },
});

export const ChartArea = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
  backgroundColor: '$bgTertiary',
  minHeight: 0,
  maxHeight: '100%',
  overflow: 'hidden',
  padding: '$4', // 1rem
});

export const Placeholder = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$bgTertiary', // $white -> $bgTertiary
  borderRadius: '$md', // 8px
  color: '$textMuted', // Cor hardcoded removida
  fontSize: '18px',
});

export const ViewSwitcher = styled('div', {
  display: 'flex',
  backgroundColor: '$bgTertiary', // $white -> $bgTertiary
  borderRadius: '$md', // 8px
  padding: '4px',
  marginLeft: 'auto',
});

export const ViewButton = styled('button', {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px', // Mantido 6px para o efeito "pílula" interna
  backgroundColor: 'transparent',
  color: '$textSecondary', // Cor hardcoded removida
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  variants: {
    active: {
      true: {
        backgroundColor: '$brandPrimary', // $primaryPink -> $brandPrimary
        color: '$bgTertiary', // $white -> $bgTertiary
        boxShadow: '$shadows.small', // 0 1px 3px rgba(0,0,0,0.1)
      }
    }
  }
});