import "@/shadcn/styles/globals.css";
import { ThemeProvider } from "@/shadcn/comps/theme-provider";
import AuthProvider from "@/comps/auth-provider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}