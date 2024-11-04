import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Factometric",
  description: "Metrics visualized in a simple way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="container bg-sidebar border my-2 rounded-lg mx-3">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
