import { Outlet } from "react-router"
import { Container, Fundo } from "./styles"
import { Sidebar } from "../../components/Sidebar"
import { ProjectsProvider } from "../../contexts/ProjectContext"

export const DefaultLayout = () => {
    return (
        <Container>
            <Sidebar />
            <Fundo>
                <ProjectsProvider>
                    <Outlet />
                </ProjectsProvider>
            </Fundo>
        </Container>
    )
}

