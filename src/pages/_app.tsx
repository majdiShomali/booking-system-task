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
      className={`custom-scrollbar h-screen w-full overflow-y-auto ${GeistSans.className}`}
    >
      <SessionProvider session={pageProps.session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="h-full w-full">
          <Component {...pageProps} />
          </main>
          <footer className="bg-accent py-6">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              © 2025 حجز الرواد. جميع الحقوق محفوظة.
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
