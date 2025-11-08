import { styled } from '../../styles';

// Re-exportar estilos do Formulário Padrão
export {
    FormContainer,
    FormGroup,
    Label,
    Input,
    Select,
    TextArea,
    SubmitButton
} from '../Form/styles';

// Re-exportar estilos da Seção de Importação (do modal de projetos)
export {
    ImportSection,
    UploadInput,
    Divider,
    ImportTitle,
    PreviewTable,
    PreviewHeader,
    PreviewRow,
    ActionCell,
    DeleteButton
} from '../CreateProjectModal/styles-specific';

// Estilo para o botão que alterna entre os modos
export const ToggleModeButton = styled('button', {
    background: 'none',
    border: 'none',
    color: '$brandPrimary',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '$sm',
    padding: '$1 $2',
    borderRadius: '$sm',
    display: 'block',
    margin: '0 0 $3 auto', // Alinha à direita

    '&:hover': {
        backgroundColor: '$brandOrange',
    }
});