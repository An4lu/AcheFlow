import { HouseSimpleIcon, MapTrifoldIcon, PackageIcon, PowerIcon, ToolboxIcon, UserCircleCheckIcon } from '@phosphor-icons/react';
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
                    <SidebarItem to='/flow'>
                        <HouseSimpleIcon size={28} weight='fill' />
                        <TextLink>HOME</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/tasks'>
                        <PackageIcon size={28} weight='fill' />
                        <TextLink>TAREFAS</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/projects'>
                        <UserCircleCheckIcon size={28} weight='fill' />
                        <TextLink>PROJETOS</TextLink>
                    </SidebarItem>
                    <SidebarItem to='/flow/calendar'>
                        <UserCircleCheckIcon size={28} weight='fill' />
                        <TextLink>CALENDÁRIO</TextLink>
                    </SidebarItem>
                    <SidebarButton>
                        <PowerIcon size={28} weight='fill' />
                        <TextLink>SAIR</TextLink>
                    </SidebarButton>
                </ContentContainer>
            </Div>
        </SidebarContainer >
    );
}