import { Route, Routes } from 'react-router-dom'
import { globalStyles } from './styles/global'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Project } from './pages/Projects'
import { Kanban } from './pages/Kanban'
import { PrivateRoute } from './layouts/PrivateRoute'

globalStyles()

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route path='/flow/' element={<DefaultLayout />} >
                    <Route path='home' element={<Home />} />
                    <Route path="projects" element={<Project />} />
                    <Route path="kanban" element={<Kanban />} />
                </Route>
            </Route>
        </Routes>
    )
}