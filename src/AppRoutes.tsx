import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from './Routes'

export const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />}/>)}
    </Routes>
  )
}