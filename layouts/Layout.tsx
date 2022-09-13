import Head from "next/head"
import NavBar from "../components/NavBar"
import styles from "../styles/Home.module.css"

interface LayoutProps {
  title: string
  children: React.ReactNode
}

export const Layout = ({title, children}: LayoutProps) => {
  return(
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Software engineering user research tool"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <NavBar/>
    {children}
  </div>)
}