import type { CSS } from "@stitches/react";
import { ModalBackground, ModalContent } from "./styles";
import { Title } from "../Title";
import React, { useState, useEffect, useRef, useContext, type ChangeEvent } from 'react';
// Importa ambas as instâncias da API
import { api_ia } from '../../services/api'; // <--- CORREÇÃO 2: Removido 'api'
import { PaperPlaneRight, Paperclip, X } from "@phosphor-icons/react"; 
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
        { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá! Como posso te ajudar hoje? (Você também pode me enviar um arquivo .xlsx para importar tarefas)' } }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    // --- Estados para Importação ---
    const { projects, refreshData } = useContext(ProjectsContext); // Pega projetos e refresh
    const { user } = useContext(AuthContext); // Pega dados do usuário
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [targetProjectId, setTargetProjectId] = useState<string>(''); 
    const [newProjectName, setNewProjectName] = useState('');
    const [isImportLoading, setIsImportLoading] = useState(false);

    // Scrolla para o final
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isLoading, isImportLoading]);

    // (Função que estava faltando)
    const cancelImport = () => {
        setSelectedFile(null);
        setTargetProjectId('');
        setNewProjectName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Limpa o seletor de arquivo
        }
    };
    
    // Limpa o estado ao fechar o modal
    useEffect(() => {
        if (!isOpen) {
            cancelImport(); // <--- Esta função estava faltando
        }
    }, [isOpen]);

    // --- Lógica de Chat (Texto) ---
    // (Esta era a função que estava duplicada e quebrada)
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // --- CORREÇÃO 1: Adicionada verificação de 'user' ---
        // Se a mensagem estiver vazia OU o usuário não estiver logado, não faz nada.
        if (!inputValue.trim() || !user) return;

        const userMessage: Message = {
            sender: 'user',
            content: { tipo_resposta: 'TEXTO', conteudo_texto: inputValue }
        };
        // Adiciona a mensagem do usuário à lista ANTES de enviar
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        const currentInput = inputValue; // <--- 'currentInput' estava faltando
        setInputValue('');
        setIsLoading(true);

        try {
            // Chama a IA de chat (vertex_ai_service.py)
            const response = await api_ia.post( 
                '/ai/chat', 
                {
                    pergunta: currentInput,
                    history: messages, 
                    nome_usuario: user.nome,
                    email_usuario: user.email,
                    id_usuario: user._id
                }
            );
            
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
            // Adiciona a mensagem de erro
            setMessages(prev => [...prev, errorMessage]);
            console.error("Erro ao chamar a API de chat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Lógica de Upload de Arquivo ---

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Define o projeto padrão como o primeiro da lista, se houver
            if (projects.length > 0) {
                setTargetProjectId(projects[0]._id);
            } else {
                setTargetProjectId('NEW'); // Força "novo projeto" se não houver existentes
            }
        }
    };

    const apiKey = import.meta.env.VITE_API_KEY;

    // (Esta função estava faltando)
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
            // Chama a API de importação (ai_api.py)
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
            refreshData(); // Atualiza a lista de projetos no app

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


    if (!isOpen) return null;

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()} css={css}>
                <div className="chat-container">
                    <div className="chat-header">
                        <Title>IAche</Title>
                        {/* Correção de acessibilidade (Erro 1) */}
                        <button onClick={onClose} className="close-button" aria-label="Fechar">X</button>
                    </div>

                    {/* LISTA DE MENSAGENS */}
                    <div className="message-list" ref={messageListRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble-container sender-${msg.sender}`}>
                               <div className="message-bubble">
                                    <p>{msg.content.conteudo_texto}</p>
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

                    {/* RENDERIZAÇÃO CONDICIONAL: MODO IMPORTAÇÃO OU MODO CHAT */}
                    {selectedFile ? (
                        // --- MODO IMPORTAÇÃO ---
                        <div className="import-container">
                            <div className="file-info">
                                <span>{selectedFile.name}</span>
                                {/* Correção de acessibilidade (Erro 1) */}
                                <button onClick={cancelImport} aria-label="Cancelar importação"><X size={16} weight="bold" /></button>
                            </div>
                            <div className="import-controls">
                                {/* Correção de acessibilidade (Erro 2) */}
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
                                    onClick={handleSendImport} // <--- Corrigido
                                    disabled={isImportLoading}
                                >
                                    {isImportLoading ? 'Importando...' : 'Importar Arquivo'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        // --- MODO CHAT (TEXTO) ---
                        <form className="message-input-container" onSubmit={handleSendMessage}>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept=".xlsx, .xls, .csv"
                                onChange={handleFileChange} // <--- Corrigido
                                style={{ display: 'none' }}
                                id="ia-file-upload"
                                // Correção de acessibilidade (Erro 3)
                                aria-label="Input de arquivo" 
                            />
                            <button 
                                type="button" 
                                className="attach-button" 
                                aria-label="Anexar arquivo para importação" // <--- Corrigido (title -> aria-label)
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip size={22} />
                            </button>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Digite sua mensagem..."
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            <button type="submit" aria-label="Enviar mensagem" className="send-button" disabled={isLoading}>
                                <PaperPlaneRight size={24} color="#ffffff" weight="bold" />
                            </button>
                        </form>
                    )}
                </div>
            </ModalContent>
        </ModalBackground>
    );
}