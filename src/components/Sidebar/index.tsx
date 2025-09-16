import { BandaidsIcon, CalendarBlankIcon, HouseSimpleIcon, KanbanIcon, SignOutIcon } from '@phosphor-icons/react';
import { ContentContainer, Div, LogoContainer, SidebarButton, SidebarContainer, SidebarItem, TextLink } from './styles';
import { Logo } from '../../pages/Login/styles';

export function Sidebar() {
    // const { logout } = useAuth();

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
                        <SidebarItem to='/flow/tasks'>
                            <KanbanIcon size={28} weight='fill' />
                            <TextLink>PROJETOS</TextLink>
                        </SidebarItem>
                        <SidebarItem to='/flow/projects'>
                            <CalendarBlankIcon size={28} weight='fill' />
                            <TextLink>CALENDÁRIO</TextLink>
                        </SidebarItem>
                        <SidebarItem to='/flow/calendar'>
                            <BandaidsIcon size={28} weight='fill' />
                            <TextLink>IAche</TextLink>
                        </SidebarItem>
                    <SidebarButton>
                        <SignOutIcon size={28} weight='fill' />
                        <TextLink>SAIR</TextLink>
                    </SidebarButton>
                </ContentContainer>
            </Div>
        </SidebarContainer >
    );
}