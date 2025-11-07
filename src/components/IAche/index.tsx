import type { CSS } from "@stitches/react";
import { ModalBackground, ModalContent } from "./styles";
import { Title } from "../Title";
import React, { useState, useEffect, useRef, useContext, type ChangeEvent, useCallback } from 'react';
import { api_ia } from '../../services/api';
// Ícones atualizados
import { PaperPlaneRight, Paperclip, X, Clock, Archive, Trash } from "@phosphor-icons/react"; 
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

// Interface para o chat salvo
interface ArchivedChat {
  id: string; // Um ID único, ex: Date.now().toString()
  title: string;
  messages: Message[];
  lastUpdated: number;
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
    
    // O 'messages' agora representa o chat ATIVO
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
    ]);
    
    // Novo estado para o ID do chat ativo ('new' = chat ainda não salvo)
    const [activeChatId, setActiveChatId] = useState<string>('new');
    
    // Novo estado para o histórico (carregado do localStorage)
    const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>([]);
    
    // Novo estado para o painel de histórico
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const { refreshData } = useContext(ProjectsContext); 
    const { user } = useContext(AuthContext); 
    
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    // --- CARREGAR HISTÓRICO DO LOCALSTORAGE ---
    useEffect(() => {
        if (isOpen && user) {
            try {
                const storedChats = localStorage.getItem(`iache_history_${user._id}`);
                if (storedChats) {
                    const parsedChats: ArchivedChat[] = JSON.parse(storedChats);
                    // Ordena para que os mais recentes apareçam primeiro
                    parsedChats.sort((a, b) => b.lastUpdated - a.lastUpdated);
                    setArchivedChats(parsedChats);
                }
            } catch (error) {
                console.error("Falha ao carregar histórico do chat:", error);
                localStorage.removeItem(`iache_history_${user._id}`); // Limpa dados corrompidos
            }
        } else if (!isOpen) {
            // Reseta para um novo chat quando o modal é fechado
            setMessages([
                { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
            ]);
            setActiveChatId('new');
            setIsHistoryOpen(false);
            setAttachedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }
        }
    }, [isOpen, user]);

    // Scroll
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // --- NOVA FUNÇÃO: GERAR E OBTER TÍTULO ---
    const getChatTitle = async (firstUserMessage: string): Promise<string> => {
        if (!user) return "Chat";
        try {
            const response = await api_ia.post(
                '/ai/generate-title',
                { first_message: firstUserMessage },
                { headers: { "x-api-key": apiKey } }
            );
            return response.data.title || "Chat";
        } catch (error) {
            console.error("Erro ao gerar título:", error);
            // Fallback simples
            return firstUserMessage.substring(0, 30) + "...";
        }
    };

    // --- NOVA FUNÇÃO: SALVAR/ATUALIZAR CHATS ---
    const saveChatHistory = useCallback((updatedMessages: Message[], chatId: string, chatTitle?: string) => {
        if (!user) return;

        setArchivedChats(prevChats => {
            const now = Date.now();
            const existingChatIndex = prevChats.findIndex(c => c.id === chatId);
            
            let newChats: ArchivedChat[];

            if (existingChatIndex !== -1) {
                // Atualiza chat existente
                const updatedChat = {
                    ...prevChats[existingChatIndex],
                    messages: updatedMessages,
                    lastUpdated: now
                };
                newChats = [
                    updatedChat, // Coloca o atualizado no topo
                    ...prevChats.slice(0, existingChatIndex),
                    ...prevChats.slice(existingChatIndex + 1)
                ];
            } else {
                // Cria novo chat
                const newChat: ArchivedChat = {
                    id: chatId,
                    title: chatTitle || "Novo Chat",
                    messages: updatedMessages,
                    lastUpdated: now
                };
                newChats = [newChat, ...prevChats]; // Adiciona no topo
            }

            try {
                localStorage.setItem(`iache_history_${user._id}`, JSON.stringify(newChats));
            } catch (error) {
                console.error("Falha ao salvar histórico no localStorage:", error);
            }
            
            return newChats;
        });

    }, [user, apiKey]);


    // --- LÓGICA DE ENVIO MODIFICADA ---
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
        
        // Mantém o histórico do chat ativo
        const historyForApi = activeChatId === 'new' ? [] : messages.slice(1); // Ignora o 1º "Olá"
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);
        setAttachedFile(null);

        // Lógica para Título e ID
        let currentChatId = activeChatId;
        let isNewChat = activeChatId === 'new';

        if (isNewChat) {
            currentChatId = Date.now().toString(); // Gera novo ID
            setActiveChatId(currentChatId);
        }

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
                
                // Regex 1: Encontra a primeira URL completa na mensagem
                const urlFinderRegex = /(https?:\/\/[^\s]+)/i;
                // Regex 2: Verifica se a URL encontrada é do tipo que queremos
                const pdfQualifierRegex = /(drive\.google\.com\/file|\.pdf|sharepoint\.com)/i;

                const urlMatch = currentInput.match(urlFinderRegex);
                
                // Verifica se encontramos uma URL (urlMatch[0]) E se ela passa na nossa verificação
                if (urlMatch && pdfQualifierRegex.test(urlMatch[0])) {
                    const foundUrl = urlMatch[0]; // Esta é a URL *completa*
                    
                    console.log("Detectada URL de PDF, roteando para /ai/chat-with-pdf-url");
                    
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
                                history: historyForApi, // Usa o histórico do chat ativo
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
            
            const finalMessages = [...newMessages, aiResponse];
            setMessages(finalMessages);

            // --- SALVAR NO HISTÓRICO ---
            if (isNewChat) {
                // Se é novo, precisamos gerar um título
                const title = await getChatTitle(currentInput);
                saveChatHistory(finalMessages, currentChatId, title);
            } else {
                // Se é existente, apenas salvamos as novas mensagens
                saveChatHistory(finalMessages, currentChatId);
            }

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
                setAttachedFile(file);
            } else {
                alert('Tipo de arquivo não suportado. Por favor, envie .xlsx, .xls, .csv ou .pdf');
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    // --- NOVA FUNÇÃO: CARREGAR CHAT DO HISTÓRICO ---
    const handleLoadChat = (chatId: string) => {
        const chatToLoad = archivedChats.find(c => c.id === chatId);
        if (chatToLoad) {
            setMessages(chatToLoad.messages);
            setActiveChatId(chatToLoad.id);
            setIsHistoryOpen(false); // Fecha o painel
            setAttachedFile(null); // Limpa qualquer anexo
        }
    };

    // --- FUNÇÃO MODIFICADA: ARQUIVAR CHAT (antiga handleClearContext) ---
    const handleNewChat = async () => {
        if (isLoading) return;

        // Se o chat atual for 'new' e tiver mais do que a saudação, salvamos antes de resetar.
        if (activeChatId === 'new' && messages.length > 1) {
            setIsLoading(true);
            const firstUserMessage = messages.find(m => m.sender === 'user')?.content.conteudo_texto || "Chat";
            const title = await getChatTitle(firstUserMessage);
            const newChatId = Date.now().toString();
            saveChatHistory(messages, newChatId, title);
            setIsLoading(false);
        }

        // Reseta o estado para um novo chat
        setMessages([
            { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
        ]);
        setActiveChatId('new');
        setAttachedFile(null);
        setInputValue('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
        
        // Limpa o contexto do backend (PDF/XLSX)
        if(user) {
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
                    { headers: { "x-api-key": apiKey } }
                );
                console.log("Contexto do backend limpo.");
            } catch (error) {
                console.error("Falha ao limpar contexto do backend:", error);
            }
        }
    };

    // --- NOVA FUNÇÃO: DELETAR CHAT DO HISTÓRICO ---
    const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation(); // Impede que o clique carregue o chat
        if (!user) return;

        const newChats = archivedChats.filter(c => c.id !== chatId);
        setArchivedChats(newChats);
        try {
            localStorage.setItem(`iache_history_${user._id}`, JSON.stringify(newChats));
        } catch (error) {
            console.error("Falha ao deletar do localStorage:", error);
        }

        // Se o chat deletado era o ativo, reseta para 'new'
        if (activeChatId === chatId) {
            // Reutiliza a lógica de resetar, mas sem salvar
            setMessages([
                { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá, eu sou a IAche! Como posso te ajudar hoje?' } }
            ]);
            setActiveChatId('new');
            setAttachedFile(null);
            setInputValue('');
        }
    };

    if (!isOpen) return null;

    // --- RENDER (JSX) MODIFICADO ---
    return (
        <ModalBackground onClick={onClose}>
            {/* O 'className' aqui controla a largura do modal */}
            <ModalContent onClick={(e) => e.stopPropagation()} css={css} className={isHistoryOpen ? 'history-open' : ''}>
                
                {/* PAINEL DE HISTÓRICO (Novo) */}
                <div className="history-panel-container">
                    <div className="history-header">
                        <Title>Histórico</Title>
                        <button onClick={() => setIsHistoryOpen(false)} className="close-history-button" aria-label="Fechar histórico">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="history-list">
                        {archivedChats.length === 0 && (
                            <p className="history-empty">Nenhum chat arquivado.</p>
                        )}
                        {archivedChats.map((chat) => (
                            <div key={chat.id} className="history-list-item" onClick={() => handleLoadChat(chat.id)}>
                                <span className="history-item-title">{chat.title}</span>
                                <button 
                                    className="history-item-delete" 
                                    onClick={(e) => handleDeleteChat(e, chat.id)}
                                    aria-label="Deletar chat"
                                    title="Deletar chat"
                                >
                                    <Trash size={16} /> 
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat-container">
                    <div className="chat-header">
                        <div className="header-left">
                            <button 
                                onClick={() => setIsHistoryOpen(true)} 
                                className="header-button" 
                                aria-label="Abrir histórico de chats"
                                title="Abrir histórico"
                                disabled={isLoading}
                            >
                                <Clock size={24} />
                            </button>
                            
                            <button 
                                onClick={handleNewChat} 
                                className="header-button" 
                                aria-label="Iniciar novo chat e arquivar o atual"
                                title="Novo Chat (Arquivar atual)"
                                disabled={isLoading}
                            >
                                <Archive size={26} /> 
                            </button>
                        </div>

                        <Title>IAche</Title>

                        <div className="header-right">
                            <button onClick={onClose} className="close-button" aria-label="Fechar">
                                <X size={26} /> {/* Tamanho ajustado para bater com os ícones */}
                            </button>
                        </div>
                    </div>

                    <div className="message-list" ref={messageListRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble-container sender-${msg.sender}`}>
                               <div className="message-bubble">
                                    <p className="chat-pre-wrap">{msg.content.conteudo_texto}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
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
                            <Paperclip size={24} />
                        </button>

                        {attachedFile && (
                            <div className="attached-file-info">
                                <Paperclip size={18} />
                                <span>{attachedFile.name.length > 20 ? `${attachedFile.name.substring(0, 20)}...` : attachedFile.name}</span>
                                <button 
                                    type="button" 
                                    onClick={() => setAttachedFile(null)}
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