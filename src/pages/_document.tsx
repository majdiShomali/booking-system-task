import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html dir={"rtl"} suppressHydrationWarning lang="ar">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="title" />

        </Head>
        <body className=" h-screen overflow-y-auto custom-scrollbar ">
          <Main />
          <NextScript />
          <footer className="bg-accent py-6">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              © 2025 حجز المستشار. جميع الحقوق محفوظة.
            </div>
          </footer>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
