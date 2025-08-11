import { HashRouter, Route, Routes } from 'react-router'
import { globalStyles } from './styles/global'
import { Login } from './pages/Login/Login'
import { UserHome } from './pages/UserHome/UserHome'

globalStyles()

export const AppRouter = () => {
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<UserHome />} />
            </Routes>
        </HashRouter>
    )
}