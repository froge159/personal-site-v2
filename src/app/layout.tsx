"use client"
import "./globals.css";
import {AnimatePresence} from "motion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react"


const queryClient = new QueryClient();

export default function RootLayout({children}: {children: React.ReactNode;}) {
	return (
	<QueryClientProvider client={queryClient}>
		<html lang="en">
			<head><title>froge159</title></head>
			<body className={`w-full h-full min-h-screen text-white overflow-x-hidden`}>
				<AnimatePresence>
					{children}
				</AnimatePresence>
				<Analytics/>
			</body>
		</html>
	</QueryClientProvider>
	);
}
