import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FileUploaderContainer } from './styles';

// Interface para a estrutura da tarefa (pode ser exportada se usada em outros lugares)
export interface Task {
    Nome: string;
    Duração: string;
}

interface FileUploaderProps {
    onDataLoaded: (data: Task[]) => void;
}

// Renomeado para FileUploader para evitar conflito com a API do navegador FileReader
export const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoaded }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Agora não há mais conflito de nome, 'FileReader' refere-se claramente à API do navegador.
        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            let jsonData: Task[] = [];

            if (fileExtension === 'csv') {
                Papa.parse(data as string, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        jsonData = results.data as Task[];
                        onDataLoaded(jsonData);
                    },
                });
            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                jsonData = XLSX.utils.sheet_to_json(worksheet) as Task[];
                onDataLoaded(jsonData);
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
            <h3>Importar Tarefas do CSV/Excel</h3>
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
        </FileUploaderContainer>
    );
};