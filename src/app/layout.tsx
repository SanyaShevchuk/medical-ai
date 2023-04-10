'use client';
import './globals.css';

import { darkTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: '100% '}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body style={{ height: '100% '}}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
