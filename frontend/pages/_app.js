import '@/shadcn/styles/globals.css'
import { ThemeProvider } from "@/shadcn/comps/theme-provider"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}