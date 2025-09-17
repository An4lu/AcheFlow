import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';// Importe a interface do contexto
import type { Task } from '../../contexts/ProjectContext';
import { FileUploaderContainer } from './styles';

interface FileUploaderProps {
    onDataLoaded: (projectName: string, tasks: Task[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoaded }) => {
    const [projectName, setProjectName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!projectName.trim()) {
            alert('Por favor, digite o nome do projeto antes de carregar o arquivo.');
            event.target.value = '';
            return;
        }

        // Usando a API nativa FileReader sem conflito de nome
        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            let jsonData: Task[] = [];

            const processAndSendData = (parsedData: Task[]) => {
                onDataLoaded(projectName, parsedData);
                setProjectName('');
                event.target.value = '';
            };

            if (fileExtension === 'csv') {
                Papa.parse(data as string, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        processAndSendData(results.data as Task[]);
                    },
                });
            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                jsonData = XLSX.utils.sheet_to_json(worksheet) as Task[];
                processAndSendData(jsonData);
            }
        };

        if (fileExtension === 'csv') {
            reader.readAsText(file);
        } else {
            reader.readAsBinaryString(file);
        }
    };

    return (
        <FileUploaderContainer>
            <h3>Importar Tarefas</h3>
            <input
                type="text"
                placeholder="Digite o nome do projeto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
        </FileUploaderContainer>
    );
};