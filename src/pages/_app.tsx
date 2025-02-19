import { type AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { GeistSans } from "geist/font/sans";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Navbar from "@/components/headers/nav";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/providers/toast-provider";
interface AppProps {
  session: Session | null;
}

const MyApp: AppType<AppProps> = ({ Component, pageProps }) => {
  return (
    <div
      className={`h-full w-full  ${GeistSans.className}`}
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
