'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { AssistantDrawer } from "@/components/AssistantDrawer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Sidebar onAssistantOpen={() => setIsAssistantOpen(true)} />
        <div className="flex flex-col min-h-screen">
          <TopBar />
          <main className="content-monarch">
            {children}
          </main>
        </div>
        <AssistantDrawer 
          isOpen={isAssistantOpen} 
          onClose={() => setIsAssistantOpen(false)} 
        />
      </body>
    </html>
  );
}
