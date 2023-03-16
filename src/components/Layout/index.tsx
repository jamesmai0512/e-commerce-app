import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import styles from './Layout.module.css'
import Footer from '../Footer'
import Header from '../Header'
import Navbar from '../Navbar'
import NavbarProduct from '../Navbar/NavbarProduct'

export interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  // Get the current path
  const path = router.pathname
  const { layout, body } = styles
  const productId = '/products/[productId]'

  return (
    <div className={layout}>
      {path === productId ? <NavbarProduct /> : ''}
      {path === productId ? '' : <Header />}
      {path === productId ? '' : <Navbar />}
      <div className={body}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
