import { BandaidsIcon, CalendarBlankIcon, HouseSimpleIcon, KanbanIcon, SignOutIcon } from '@phosphor-icons/react';
import { ContentContainer, Div, LogoContainer, SidebarButton, SidebarContainer, SidebarItem, TextLink } from './styles';
import { Logo } from '../../pages/Login/styles';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
    // const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
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
                    <SidebarItem to='/flow/calendar'>
                        <CalendarBlankIcon size={28} weight='fill' />
                        <TextLink>CALENDÁRIO</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/ia'>
                        <BandaidsIcon size={28} weight='fill' />
                        <TextLink>IAche</TextLink>
                    </SidebarItem>
                    <SidebarButton onClick={handleLogout}>
                        <SignOutIcon size={28} weight='fill' />
                        <TextLink>SAIR</TextLink>
                    </SidebarButton>
                </ContentContainer>
            </Div>
        </SidebarContainer >
    );
}