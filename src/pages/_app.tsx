import { type AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Navbar from "@/components/headers/nav";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/providers/toast-provider";
import { Cairo } from "next/font/google"; 

interface AppProps {
  session: Session | null;
}
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-cairo", 
});


const MyApp: AppType<AppProps> = ({ Component, pageProps }) => {
  return (
    <div
      className={`h-full w-full  ${cairo.variable} font-cairo`}
    >
      <SessionProvider session={pageProps.session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Component {...pageProps} />
   

          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
