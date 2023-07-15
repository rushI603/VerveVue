import './globals.css'
import Nav from '../components/Nav'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VerveVue',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" type='image/<generated>' sizes="<generated>" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true} >
        
        <div className='container'>
          <Nav/>
          {children}
        </div>
      </body>
      
    </html>
  )
}
