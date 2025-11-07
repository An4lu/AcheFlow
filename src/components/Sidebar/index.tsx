import { ArchiveIcon, BandaidsIcon, HandPalmIcon, HouseSimpleIcon, KanbanIcon, SignOutIcon, UsersIcon } from '@phosphor-icons/react';
import { ContentContainer, Div, LogoContainer, SidebarButton, SidebarContainer, SidebarItem, TextLink, Logo } from './styles';
import { useState } from 'react';
import { IAche } from '../IAche';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
    const { logout } = useAuth();
    const [isIAcheOpen, setIsIAcheOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <SidebarContainer>
            <LogoContainer>
                <Logo>achē</Logo>
            </LogoContainer>
            <Div>
                <ContentContainer>
                    <SidebarItem to='/flow/home'>
                        <HouseSimpleIcon weight='fill' />
                        <TextLink>PRINCIPAL</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/geral'>
                        <KanbanIcon weight='fill' />
                        <TextLink>VISÃO GERAL</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/kanban'>
                        <HandPalmIcon weight='fill' />
                        <TextLink>KANBAN</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/projects'>
                        <ArchiveIcon weight='fill' />
                        <TextLink>PROJETOS</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/funcionarios'>
                        <UsersIcon weight='fill' />
                        <TextLink>EQUIPE</TextLink>
                    </SidebarItem>
                    <SidebarButton onClick={() => setIsIAcheOpen(true)}>
                        <BandaidsIcon weight='fill' />
                        <TextLink>IAche</TextLink>
                    </SidebarButton>
                    <SidebarButton onClick={handleLogout}>
                        <SignOutIcon weight='fill' />
                        <TextLink>SAIR</TextLink>
                    </SidebarButton>
                </ContentContainer>
            </Div>
            <IAche isOpen={isIAcheOpen} onClose={() => setIsIAcheOpen(false)} />
        </SidebarContainer >
    );
}