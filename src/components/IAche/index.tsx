import type { CSS } from "@stitches/react";
import { ModalBackground, ModalContent } from "./styles";
import { Title } from "../Title";
import React, { useState, useEffect, useRef, useContext, type ChangeEvent } from 'react';
import { api_ia } from '../../services/api';
import { PaperPlaneRight, Paperclip, X, Trash } from "@phosphor-icons/react"; 
import { ProjectsContext } from "../../contexts/ProjectContext"; 
import { AuthContext } from "../../contexts/AuthContext";

interface Message {
    sender: 'user' | 'ai' | 'system';
    content: {
        tipo_resposta: string;
        conteudo_texto: string;
        dados?: any;
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    css?: CSS;
}

export function IAche({ isOpen, onClose, css }: ModalProps) {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const { projects, refreshData } = useContext(ProjectsContext); 
    const { user } = useContext(AuthContext); 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [attachedPdf, setAttachedPdf] = useState<File | null>(null);
    const [targetProjectId, setTargetProjectId] = useState<string>(''); 
    const [newProjectName, setNewProjectName] = useState('');
    const [isImportLoading, setIsImportLoading] = useState(false);
    
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isLoading, isImportLoading]);

    const cancelImport = () => {
        setSelectedFile(null);
        setAttachedPdf(null);
        setTargetProjectId('');
        setNewProjectName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };
    
    useEffect(() => {
        if (!isOpen) {
            cancelImport(); 
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!inputValue.trim() || !user) return;

        let userMessageText = inputValue;
        const fileToSubmit = attachedPdf;

        if (fileToSubmit) {
            userMessageText = `[Analisando: ${fileToSubmit.name}]\n\n${inputValue}`;
        }

        const userMessage: Message = {
            sender: 'user',
            content: { tipo_resposta: 'TEXTO', conteudo_texto: userMessageText }
        };
        
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);
        setAttachedPdf(null);

        try {
            let response; 

            if (fileToSubmit) {
                const formData = new FormData();
                formData.append('file', fileToSubmit, fileToSubmit.name);
                formData.append('pergunta', currentInput);
                if (user) {
                    formData.append('nome_usuario', user.nome);
                    formData.append('email_usuario', user.email);
                    formData.append('id_usuario', user._id);
                }
                
                response = await api_ia.post('/ai/chat-with-pdf', formData, {
                    headers: { "x-api-key": apiKey, 'Content-Type': 'multipart/form-data' } 
                });

            } else {
                response = await api_ia.post( 
                    '/ai/chat', 
                    {
                        pergunta: currentInput,
                        history: newMessages.slice(0, -1),
                        nome_usuario: user.nome,
                        email_usuario: user.email,
                        id_usuario: user._id
                    }
                );
            }
            
            const aiContent = response.data;

            const aiResponse: Message = { sender: 'ai', content: aiContent };
            setMessages(prev => [...prev, aiResponse]);

            const toolSteps = aiContent.dados || []; 
            const didCreateOrUpdate = toolSteps.some((step: any) => 
                (
                    step.call.name === 'create_project' || 
                    step.call.name === 'update_project' ||
                    step.call.name === 'create_task' ||
                    step.call.name === 'update_task' ||
                    step.call.name === 'import_project_from_url'
                ) && step.result.ok === true
            );

            if (didCreateOrUpdate) {
                console.log("IA detectou mudança nos dados, atualizando a lista...");
                refreshData();
            }

        } catch (error) {
            const errorMessage: Message = { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Desculpe, ocorreu um erro. Tente novamente.' } };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Erro ao chamar a API de chat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileType = file.type;
            const fileName = file.name.toLowerCase();

            if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
                setAttachedPdf(file);
                setSelectedFile(null);
            } 
            else if (
                fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                fileType === 'application/vnd.ms-excel' ||
                fileName.endsWith('.xlsx') ||
                fileName.endsWith('.xls') ||
                fileName.endsWith('.csv')
            ) {
                setSelectedFile(file);
                setAttachedPdf(null); 
                
                if (projects.length > 0) {
                    setTargetProjectId(projects[0]._id);
                } else {
                    setTargetProjectId('NEW'); 
                }
            } else {
                alert('Tipo de arquivo não suportado. Por favor, envie .xlsx, .xls, .csv ou .pdf');
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const handleSendImport = async () => {
        if (!selectedFile) return;
        if (targetProjectId === 'NEW' && !newProjectName.trim()) {
            alert('Por favor, digite um nome para o novo projeto.');
            return;
        }

        setIsImportLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        
        if (user) {
            formData.append('id_usuario', user._id);
        }

        if (targetProjectId === 'NEW') {
            formData.append('create_project_flag', '1');
            formData.append('projeto_nome', newProjectName);
            formData.append('projeto_situacao', 'Em planejamento'); 
        } else {
            formData.append('projeto_id', targetProjectId);
        }
        
        const loadingMessage: Message = {
            sender: 'system',
            content: { tipo_resposta: 'TEXTO', conteudo_texto: `Importando '${selectedFile.name}'...` }
        };
        setMessages(prev => [...prev, loadingMessage]);

        try {
            const response = await api_ia.post('/tasks/from-xlsx', formData, {
                headers: { "x-api-key": apiKey, 'Content-Type': 'multipart/form-data' } 
            });

            const total = response.data.total || 0;
            const nome = targetProjectId === 'NEW' ? newProjectName : projects.find(p => p._id === targetProjectId)?.nome;
            
            const successMessage: Message = {
                sender: 'ai',
                content: { tipo_resposta: 'TEXTO', conteudo_texto: `Sucesso! Importei ${total} tarefas para o projeto '${nome}'.` }
            };
            setMessages(prev => [...prev.slice(0, -1), successMessage]); 
            refreshData(); 

        } catch (error: any) {
            const errorMsg = error.response?.data?.erro || error.response?.data?.detail || 'Falha ao importar o arquivo.';
            const errorMessage: Message = {
                sender: 'ai',
                content: { tipo_resposta: 'TEXTO', conteudo_texto: `Desculpe, falhei ao importar: ${errorMsg}` }
            };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]); 
            console.error("Erro ao chamar a API de importação:", error);
        } finally {
            setIsImportLoading(false);
            cancelImport();
        }
    };

    const handleClearContext = async () => {
        if (isLoading || isImportLoading || !user) return; 

        setIsLoading(true); 

        try {
            await api_ia.post(
                '/ai/clear-context',
                {
                    pergunta: '',
                    history: null,
                    nome_usuario: user.nome,
                    email_usuario: user.email,
                    id_usuario: user._id
                },
                {
                    headers: { "x-api-key": apiKey } 
                }
            );

            setMessages([
                { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
            ]);
            
            setAttachedPdf(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }

        } catch (error) {
            const errorMessage: Message = { 
                sender: 'ai', 
                content: { 
                    tipo_resposta: 'TEXTO', 
                    conteudo_texto: 'Desculpe, não consegui limpar a memória. Tente novamente.' 
                } 
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Erro ao limpar contexto:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()} css={css}>
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="header-left">
                            <button 
                                onClick={handleClearContext} 
                                className="clear-context-button" 
                                aria-label="Limpar contexto do arquivo"
                                title="Esquecer o arquivo PDF/XLSX atual"
                                disabled={isLoading || isImportLoading}
                            >
                                <Trash size={24} />
                            </button>
                            <Title>IAche</Title>
                        </div>
                        <button onClick={onClose} className="close-button" aria-label="Fechar">X</button>
                    </div>

                    <div className="message-list" ref={messageListRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble-container sender-${msg.sender}`}>
                               <div className="message-bubble">
                                    <p className="chat-pre-wrap">{msg.content.conteudo_texto}</p>
                                </div>
                            </div>
                        ))}
                        {(isLoading || isImportLoading) && (
                             <div className="message-bubble-container sender-ai">
                                <div className="message-bubble">
                                    <p className="typing-indicator"><span>.</span><span>.</span><span>.</span></p>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedFile ? (
                        <div className="import-container">
                            <div className="file-info">
                                <span>{selectedFile.name}</span>
                                <button onClick={cancelImport} aria-label="Cancelar importação"><X size={16} weight="bold" /></button>
                            </div>
                            <div className="import-controls">
                                <select 
                                    className="import-select"
                                    value={targetProjectId}
                                    onChange={(e) => setTargetProjectId(e.target.value)}
                                    aria-label="Selecionar projeto para importação"
                                >
                                    {projects.map(p => (
                                        <option key={p._id} value={p._id}>{p.nome}</option>
                                    ))}
                                    <option value="NEW">--- Criar Novo Projeto ---</option>
                                </select>

                                {targetProjectId === 'NEW' && (
                                    <input
                                        type="text"
                                        className="import-input"
                                        placeholder="Digite o nome do novo projeto..."
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        aria-label="Nome do novo projeto"
                                    />
                                )}
                                <button 
                                    className="import-button"
                                    onClick={handleSendImport}
                                    disabled={isImportLoading}
                                >
                                    {isImportLoading ? 'Importando...' : 'Importar Arquivo'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form className="message-input-container" onSubmit={handleSendMessage}>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept=".xlsx, .xls, .csv, .pdf"
                                onChange={handleFileChange}
                                className="hidden-file-input"
                                id="ia-file-upload"
                                aria-label="Input de arquivo" 
                            />
                            <button 
                                type="button" 
                                className="attach-button" 
                                aria-label="Anexar arquivo"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip size={22} />
                            </button>

                            {attachedPdf && (
                                <div className="attached-file-info">
                                    <Paperclip size={16} />
                                    <span>{attachedPdf.name.length > 20 ? `${attachedPdf.name.substring(0, 20)}...` : attachedPdf.name}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setAttachedPdf(null)}
                                        aria-label="Remover PDF anexo"
                                    >
                                        <X size={16} weight="bold" />
                                    </button>
                                </div>
                            )}

                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={attachedPdf ? "Qual sua pergunta sobre o PDF?" : "Digite sua mensagem..."}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            <button type="submit" aria-label="Enviar mensagem" className="send-button" disabled={isLoading || !inputValue.trim()}>
                                <PaperPlaneRight size={24} color="#ffffff" weight="bold" />
                            </button>
                        </form>
                    )}
                </div>
            </ModalContent>
        </ModalBackground>
    );
}