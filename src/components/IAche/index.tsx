import type { CSS } from "@stitches/react";
import { ModalBackground, ModalContent } from "./styles";
import { Title } from "../Title";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PaperPlaneRight } from "@phosphor-icons/react";

interface Message {
    sender: 'user' | 'ai';
    content: {
        tipo_resposta: string;
        conteudo_texto: string;
        dados?: any; // Mantemos 'dados' para flexibilidade futura, mas não o usaremos
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    css?: CSS;
}

export function IAche({ isOpen, onClose, css }: ModalProps) {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Olá! Como posso te ajudar hoje?' } }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            sender: 'user',
            content: { tipo_resposta: 'TEXTO', conteudo_texto: inputValue }
        };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        try {
            const token = localStorage.getItem('@AcheFlow:token');            const response = await axios.post(
                'https://ache-flow-back-182737921073.southamerica-east1.run.app/ai/chat',
                { pergunta: currentInput },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const aiResponse: Message = { sender: 'ai', content: response.data };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', content: { tipo_resposta: 'TEXTO', conteudo_texto: 'Desculpe, ocorreu um erro. Tente novamente.' } };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Erro ao chamar a API:", error);
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
                        <Title>IAche</Title>
                        <button onClick={onClose} className="close-button">X</button>
                    </div>
                    <div className="message-list" ref={messageListRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble-container sender-${msg.sender}`}>
                               <div className="message-bubble">
                                    {/* LÓGICA SIMPLIFICADA: Sempre renderiza apenas o texto */}
                                    <p>{msg.content.conteudo_texto}</p>
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
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            autoComplete="off"
                        />
                        <button type="submit" aria-label="Enviar mensagem">
                            <PaperPlaneRight size={24} color="#ffffff" weight="bold" />
                        </button>
                    </form>
                </div>
            </ModalContent>
        </ModalBackground>
    );
}