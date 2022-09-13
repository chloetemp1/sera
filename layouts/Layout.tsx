import Head from "next/head"
import NavBar from "../components/NavBar"

interface LayoutProps {
  title: string
  children: React.ReactNode
}

export const Layout = ({title, children}: LayoutProps) => {
  return(
    <div className="flex flex-col items-center px-6 justify-items-center">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Software engineering user research tool"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <header className="sticky top-0 w-full bg-white">
      <NavBar />
    </header>
      
        {children}
    </div>
  )
}