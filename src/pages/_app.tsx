import { type AppType } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { GeistSans } from "geist/font/sans";

import { api } from "@/utils/api";
import "@/styles/globals.css";
import Navbar from "@/components/headers/nav";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/providers/toast-provider";
// import PioneerSidebar from "@/components/headers/sidebar/pioneer-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/side-bar";

interface AppProps {
  session: Session | null;
}

const MyApp: AppType<AppProps> = ({ Component, pageProps, router }) => {

  // const defaultLayout = (page: React.ReactNode) => {
  //   return (
  //     <div>
  //       <Navbar />
  //       {page}
  //     </div>
  //   );
  // };

  // const dashboardLayout = (page: React.ReactNode) => {
  //   return (
  //     <div>
  //     <Navbar />
  //     {page}
  //   </div>
  //   );
  // };

  // // Determine which layout to use based on the route
  // const getLayout = () => {
  //   if (router.pathname.startsWith("/dashboard")) {
  //     return dashboardLayout(<Component {...pageProps} />);
  //   } else {
  //     return defaultLayout(<Component {...pageProps} />);
  //   }
  // };

  return (
    <div className={`h-screen w-full overflow-y-auto custom-scrollbar ${GeistSans.className}`}>
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