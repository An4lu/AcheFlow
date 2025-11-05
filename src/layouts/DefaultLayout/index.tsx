import { Outlet } from "react-router-dom";
import { Container, Fundo } from "./styles";
import { Sidebar } from "../../components/Sidebar";
import { ProjectsProvider } from "../../contexts/ProjectContext";
import { FloatingActionButton } from "../../components/FloatingActionButton";
import { CreateProjectModal } from "../../components/CreateProjectModal";
import { CreateTaskModal } from "../../components/CreateTaskModal";
import { CreateEmployeeModal } from "../../components/CreateEmployeeModal";
import { EmployeeDetailsModal } from "../../components/EmployeeDetailsModal";

export const DefaultLayout = () => {
    return (
        <ProjectsProvider>
            <Container>
                <Sidebar />
                <Fundo>
                    <Outlet />

                    <FloatingActionButton />
                    <CreateProjectModal />
                    <CreateTaskModal />
                    <CreateEmployeeModal />
                    <EmployeeDetailsModal />
                </Fundo>
            </Container>
        </ProjectsProvider>
    );
}