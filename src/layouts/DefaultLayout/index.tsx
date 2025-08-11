import { Outlet } from "react-router"
import { Container } from "./styles"

export const DefaultLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}

