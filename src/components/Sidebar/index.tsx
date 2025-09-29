import { BandaidsIcon, HouseSimpleIcon, KanbanIcon, SignOutIcon } from '@phosphor-icons/react';
import { ContentContainer, Div, LogoContainer, SidebarButton, SidebarContainer, SidebarItem, TextLink } from './styles';
import { Logo } from '../../pages/Login/styles';
import { useState } from 'react';
import { IAche } from '../IAche';
import { useAuth } from '../../hooks/useAuth';
import { HandIcon } from '@phosphor-icons/react/dist/ssr';

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
                        <HouseSimpleIcon size={28} weight='fill' />
                        <TextLink>PRINCIPAL</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/projects'>
                        <KanbanIcon size={28} weight='fill' />
                        <TextLink>PROJETOS</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/kanban'>
                        <HandIcon size={28} weight='fill' />
                        <TextLink>KANBAN</TextLink>
                    </SidebarItem>
                    <SidebarButton onClick={() => setIsIAcheOpen(true)}>
                        <BandaidsIcon size={28} weight='fill' />
                        <TextLink>IAche</TextLink>
                    </SidebarButton>
                    <SidebarButton onClick={handleLogout}>
                        <SignOutIcon size={28} weight='fill' />
                        <TextLink>SAIR</TextLink>
                    </SidebarButton>
                </ContentContainer>
            </Div>
            <IAche isOpen={isIAcheOpen} onClose={() => setIsIAcheOpen(false)} />
        </SidebarContainer >
    );
}