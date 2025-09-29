import { useContext } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import {
    FiltersWrapper, TogglesContainer, CheckboxGroup, Checkbox, Label,
    ControlsContainer, FormGroup, Select,
    Input
} from './styles';

export interface ActiveFilters {
    projeto: boolean;
    responsavel: boolean;
    urgencia: boolean;
    prazo: boolean;
}

export interface FilterValues {
    projeto_id: string;
    responsavel_id: string;
    startDate: string;
    endDate: string;
}

interface ProjectFiltersProps {
    activeFilters: ActiveFilters;
    filterValues: FilterValues;
    onToggleFilter: (filterName: keyof ActiveFilters) => void;
    onFilterValueChange: (filterName: keyof FilterValues, value: string) => void;
}

export function ProjectFilters({
    activeFilters,
    filterValues,
    onToggleFilter,
    onFilterValueChange
}: ProjectFiltersProps) {
    const { projects, funcionarios } = useContext(ProjectsContext);

    return (
        <FiltersWrapper>
            <TogglesContainer>
                <Label>Ativar Filtros:</Label>
                <CheckboxGroup>
                    <Checkbox type="checkbox" id="toggle-projeto" checked={activeFilters.projeto} onChange={() => onToggleFilter('projeto')} />
                    <Label htmlFor="toggle-projeto">Projeto</Label>
                </CheckboxGroup>
                <CheckboxGroup>
                    <Checkbox type="checkbox" id="toggle-responsavel" checked={activeFilters.responsavel} onChange={() => onToggleFilter('responsavel')} />
                    <Label htmlFor="toggle-responsavel">Responsável</Label>
                </CheckboxGroup>
                <CheckboxGroup>
                    <Checkbox type="checkbox" id="toggle-urgencia" checked={activeFilters.urgencia} onChange={() => onToggleFilter('urgencia')} />
                    <Label htmlFor="toggle-urgencia">Apenas Urgentes</Label>
                </CheckboxGroup>
                <CheckboxGroup>
                    <Checkbox type="checkbox" id="toggle-prazo" checked={activeFilters.prazo} onChange={() => onToggleFilter('prazo')} />
                    <Label htmlFor="toggle-prazo">Prazo</Label>
                </CheckboxGroup>
            </TogglesContainer>

            <ControlsContainer>
                {activeFilters.projeto && (
                    <FormGroup>
                        <Select
                            id="project-filter"
                            value={filterValues.projeto_id}
                            onChange={(e) => onFilterValueChange('projeto_id', e.target.value)}
                        >
                            <option value="">Todos os Projetos</option>
                            {projects.map(p => <option key={p._id} value={p._id}>{p.nome}</option>)}
                        </Select>
                    </FormGroup>
                )}

                {activeFilters.responsavel && (
                    <FormGroup>
                        <Select
                            id="responsible-filter"
                            value={filterValues.responsavel_id}
                            onChange={(e) => onFilterValueChange('responsavel_id', e.target.value)}
                        >
                            <option value="">Todos os Responsáveis</option>
                            {funcionarios.map(f => <option key={f._id} value={f._id}>{f.nome} {f.sobrenome}</option>)}
                        </Select>
                    </FormGroup>
                )}
                {activeFilters.prazo && (
                    <>
                        <FormGroup>
                            <Label htmlFor="start-date">De:</Label>
                            <Input
                                type="date"
                                id="start-date"
                                value={filterValues.startDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterValueChange('startDate', e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="end-date">Até:</Label>
                            <Input
                                type="date"
                                id="end-date"
                                value={filterValues.endDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterValueChange('endDate', e.target.value)}
                            />
                        </FormGroup>
                    </>
                )}
            </ControlsContainer>
        </FiltersWrapper>
    );
}