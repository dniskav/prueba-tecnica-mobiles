import { Header } from '../../components'
import { Outlet } from 'react-router-dom'

export function Home() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  )
}
