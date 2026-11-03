import { useEffect } from "react";
import type { ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageProps {
  title: string;
  text?: string;
  children: ReactNode;
}

function Page({ title, text, children }: PageProps) {
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={text} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Page;
