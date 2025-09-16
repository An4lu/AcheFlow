import { Outlet } from "react-router"
import { Container, Fundo } from "./styles"
import { Sidebar } from "../../components/Sidebar"

export const DefaultLayout = () => {
    return (
        <Container>
            <Sidebar />
            <Fundo>
                <Outlet />
            </Fundo>
        </Container>
    )
}

