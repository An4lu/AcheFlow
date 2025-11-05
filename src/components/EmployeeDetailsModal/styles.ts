import { styled } from '../../styles';
// Reutiliza estilos do TaskDetailsModal
import { DetailsContainer, DetailItem, Label, Value } from '../TaskDetailsModal/styles';

export { DetailsContainer, DetailItem, Label, Value };

// Estilo para o grid de estatísticas
export const StatsGrid = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '$4',
    padding: '$4 0',
    borderTop: '1px solid $borderSubtle',
    borderBottom: '1px solid $borderSubtle',
    marginTop: '$4',
});