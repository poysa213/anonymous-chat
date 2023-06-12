import React from 'react';
import './globals.css';
import { Inter } from "next/font/google";


export const metadata = {
	title: 'Chat',
	description: "Anonymous chat",
};
export const inter = Inter({
  weight: ["100", "200", "400", "500", "600"],
  subsets:["latin"]
});


type Props = {
  children: React.ReactNode;
};

export default function RootLayout({
	children,
}: Props) {
	
	return (
		<html lang="en">
		  <body>
			{children}
		  </body>
		</html>
	);

}