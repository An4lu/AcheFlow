import { useState, type ChangeEvent } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Actions, PreviewTable, SaveButton, UploadStep, WizardContainer } from './styles';
import { toast } from 'react-toastify'; 

interface ParsedTask {
    Nome: string;
    Descricao: string;
    Prioridade: 'baixa' | 'média' | 'alta';
    Prazo: string;
    ResponsavelEmail: string; 
}

interface ProjectImportWizardProps {
    onComplete: () => void;
}

export function ProjectImportWizard({ onComplete }: ProjectImportWizardProps) {
    const [projectName, setProjectName] = useState('');
    const [tasks, setTasks] = useState<ParsedTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setProjectName(file.name.split('.').slice(0, -1).join('.'));

        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            let parsedData: any[] = [];
            if (fileExtension === 'csv') {
                parsedData = Papa.parse(data as string, { header: true, skipEmptyLines: true }).data;
            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                parsedData = XLSX.utils.sheet_to_json(worksheet);
            }
            setTasks(parsedData as ParsedTask[]);
        };

        if (fileExtension === 'csv') reader.readAsText(file);
        else reader.readAsBinaryString(file);
    };

    const handleTaskChange = (index: number, field: keyof ParsedTask, value: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], [field]: value };
        setTasks(updatedTasks);
    };

    const handleSaveProject = async () => {
        setIsLoading(true);

        toast.success("Projeto salvo! (simulação)"); 
        setIsLoading(false);
        onComplete();
    };

    return (
        <WizardContainer>
            {tasks.length === 0 ? (
                <UploadStep>
                    <p>Selecione um arquivo .xlsx ou .csv para importar as tarefas.</p>
                    <p>O nome do arquivo será usado como nome do projeto.</p>
                    <br />
                    <label htmlFor="file-upload">Clique aqui para selecionar o arquivo</label>
                    <input id="file-upload" type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
                </UploadStep>
            ) : (
                <div>
                    <h3>Pré-visualização do Projeto: {projectName}</h3>
                    <p>Ajuste os dados antes de salvar.</p>
                    <PreviewTable>
                        <thead>
                            <tr>
                                <th>Nome da Tarefa</th>
                                <th>Descrição</th>
                                <th>Prioridade</th>
                                <th>Prazo</th>
                                <th>Email do Responsável</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td><input value={task.Nome} onChange={(e) => handleTaskChange(index, 'Nome', e.target.value)} /></td>
                                    <td><input value={task.Descricao} onChange={(e) => handleTaskChange(index, 'Descricao', e.target.value)} /></td>
                                    <td><input value={task.Prioridade} onChange={(e) => handleTaskChange(index, 'Prioridade', e.target.value)} /></td>
                                    <td><input type="date" value={task.Prazo} onChange={(e) => handleTaskChange(index, 'Prazo', e.target.value)} /></td>
                                    <td><input type="email" value={task.ResponsavelEmail} onChange={(e) => handleTaskChange(index, 'ResponsavelEmail', e.target.value)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </PreviewTable>
                    <Actions>
                        <SaveButton onClick={handleSaveProject} disabled={isLoading}>
                            {isLoading ? 'Salvando...' : 'Salvar Projeto'}
                        </SaveButton>
                    </Actions>
                </div>
            )}
        </WizardContainer>
    );
}