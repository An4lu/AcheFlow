import { HashRouter, Route, Routes } from 'react-router-dom'
import { globalStyles } from './styles/global'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Tasks } from './pages/Tasks'
import { Calendar } from './pages/Calendar'

globalStyles()

export const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='flow/*' element={<DefaultLayout />} >
                    <Route index path='home' element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="calendar" element={<Calendar />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}