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

const SPREADSHEET_TYPES = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/csv' // .csv
];

const SPREADSHEET_EXTENSIONS = ['.xlsx', '.xls', '.csv'];

export function IAche({ isOpen, onClose, css }: ModalProps) {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const { refreshData } = useContext(ProjectsContext); 
    const { user } = useContext(AuthContext); 
    
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (!isOpen) {
            setAttachedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!inputValue.trim() || !user) return;

        let userMessageText = inputValue;
        const fileToSubmit = attachedFile; 

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
        setAttachedFile(null);

        try {
            let response; 
            let endpoint = '/ai/chat';
            const formData = new FormData();

            if (fileToSubmit) {
                formData.append('file', fileToSubmit, fileToSubmit.name);
                formData.append('pergunta', currentInput);
                if (user) {
                    formData.append('nome_usuario', user.nome);
                    formData.append('email_usuario', user.email);
                    formData.append('id_usuario', user._id);
                }

                const fileType = fileToSubmit.type;
                const fileName = fileToSubmit.name.toLowerCase();

                if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
                    endpoint = '/ai/chat-with-pdf';
                } else if (SPREADSHEET_TYPES.includes(fileType) || SPREADSHEET_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
                    endpoint = '/ai/chat-with-xlsx';
                }
                
                response = await api_ia.post(endpoint, formData, {
                    headers: { "x-api-key": apiKey, 'Content-Type': 'multipart/form-data' } 
                });

            } else {
                
                // --- INÍCIO DA CORREÇÃO ---
                // Regex 1: Encontra a primeira URL completa na mensagem
                const urlFinderRegex = /(https?:\/\/[^\s]+)/i;
                // Regex 2: Verifica se a URL encontrada é do tipo que queremos
                const pdfQualifierRegex = /(drive\.google\.com\/file|\.pdf|sharepoint\.com)/i;

                const urlMatch = currentInput.match(urlFinderRegex);
                
                // Verifica se encontramos uma URL (urlMatch[0]) E se ela passa na nossa verificação
                if (urlMatch && pdfQualifierRegex.test(urlMatch[0])) {
                    const foundUrl = urlMatch[0]; // Esta é a URL *completa*
                    
                    console.log("Detectada URL de PDF, roteando para /ai/chat-with-pdf-url");
                    console.log("URL Completa:", foundUrl); // Novo log para depuração
                    
                    endpoint = '/ai/chat-with-pdf-url';
                    
                    response = await api_ia.post(endpoint, {
                        pergunta: currentInput,
                        pdf_url: foundUrl, // <-- CORRIGIDO: Envia a URL completa
                        nome_usuario: user.nome,
                        email_usuario: user.email,
                        id_usuario: user._id
                    }, {
                        headers: { "x-api-key": apiKey }
                    });

                } else {
                    console.log("Nenhum anexo ou URL de PDF, roteando para /ai/chat");
                    endpoint = '/ai/chat';
                    
                    response = await api_ia.post( 
                        endpoint, 
                            {
                                pergunta: currentInput,
                                history: newMessages.slice(0, -1),
                                nome_usuario: user.nome,
                                email_usuario: user.email,
                                id_usuario: user._id
                            },
                            {
                                headers: { "x-api-key": apiKey }
                            }
                        );
                }
            }
            
            const aiContent = response.data;

            const aiResponse: Message = { sender: 'ai', content: aiContent };
            setMessages(prev => [...prev, aiResponse]);

            const toolSteps = aiContent.dados || []; 
            const didCreateOrUpdate = toolSteps.some((step: any) => 
                (
                    step.call.name === 'import_from_file' || 
                    step.call.name === 'create_project' || 
                    step.call.name === 'update_project' ||
                    step.call.name === 'create_task' ||
                    step.call.name === 'update_task' ||
                    step.call.name === 'import_project_from_url'
                ) && (step.result.ok === true || (step.result && step.result.total > 0))
            );

            if (didCreateOrUpdate) {
                console.log("IA detectou mudança nos dados, atualizando a lista...");
                refreshData();
            }

        } catch (error: any) {
            const errorMsg = error.response?.data?.erro || error.response?.data?.detail || 'Desculpe, ocorreu um erro. Tente novamente.';
            const errorMessage: Message = { 
                sender: 'ai', 
                content: { 
                    tipo_resposta: 'TEXTO', 
                    conteudo_texto: errorMsg 
                } 
            };
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

            // Verifica se é PDF
            if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
                setAttachedFile(file);
            } 
            // Verifica se é Planilha
            else if (SPREADSHEET_TYPES.includes(fileType) || SPREADSHEET_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
                setAttachedFile(file); // << MUDANÇA PRINCIPAL: Apenas anexa, não muda a UI
            } else {
                alert('Tipo de arquivo não suportado. Por favor, envie .xlsx, .xls, .csv ou .pdf');
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const handleClearContext = async () => {
        if (isLoading || !user) return; 

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

            // Limpa o frontend
            setMessages([
                { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
            ]);
            
            setAttachedFile(null); // Limpa o anexo local
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
                                disabled={isLoading} // Apenas o isLoading geral agora
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
                        {isLoading && ( // Apenas o isLoading geral
                             <div className="message-bubble-container sender-ai">
                                <div className="message-bubble">
                                    <p className="typing-indicator"><span>.</span><span>.</span><span>.</span></p>
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="message-input-container" onSubmit={handleSendMessage}>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept=".xlsx, .xls, .csv, .pdf" // Mantém os tipos aceitos
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

                        {attachedFile && ( // Lógica de exibição do anexo
                            <div className="attached-file-info">
                                <Paperclip size={16} />
                                <span>{attachedFile.name.length > 20 ? `${attachedFile.name.substring(0, 20)}...` : attachedFile.name}</span>
                                <button 
                                    type="button" 
                                    onClick={() => setAttachedFile(null)} // Botão para remover o anexo
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
                            placeholder={attachedFile ? `Perguntar sobre ${attachedFile.name}...` : "Digite sua mensagem..."}
                            autoComplete="off"
                            disabled={isLoading}
                        />
                        <button type="submit" aria-label="Enviar mensagem" className="send-button" disabled={isLoading || !inputValue.trim()}>
                            <PaperPlaneRight size={24} color="#ffffff" weight="bold" />
                        </button>
                    </form>
                </div>
            </ModalContent>
        </ModalBackground>
    );
}