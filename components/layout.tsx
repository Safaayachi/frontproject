import Header from "./header";
import Footer from "./footer";
import Image from "next/image";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
	children: ReactNode;
	hasFooter?: boolean;
	hasHeader?: boolean;
}
export default function Layout({
	children,
	hasFooter = true,
	hasHeader = true,
}: Props) {
	const router = useRouter();
	return (
		<div dir={router.locale === "ar" ? "rtl" : "ltr"}>
			{hasHeader && <Header />}
			{children}
			{hasFooter && <Footer />}
		</div>
	);
}
