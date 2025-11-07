import { Route, Routes } from 'react-router-dom'
import { globalStyles } from './styles/global'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { VisaoGeral } from './pages/Projects'
import { Kanban } from './pages/Kanban'
import { PrivateRoute } from './layouts/PrivateRoute'
import { Employees } from './pages/Employees'
import { ProjectsList } from './pages/ProjectsList'

globalStyles()

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route path='/flow/' element={<DefaultLayout />} >
                    <Route path="home" element={<Home />} />
                    <Route path="geral" element={<VisaoGeral />} />
                    <Route path="projects" element={<ProjectsList />} />
                    <Route path="kanban" element={<Kanban />} />
                    <Route path="funcionarios" element={<Employees />} />
                </Route>
            </Route>
        </Routes>
    )
}