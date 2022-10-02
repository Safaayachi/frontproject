import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps, locale: ctx?.locale };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="robots" content="noindex,nofollow" />
					<meta name="googlebot" content="noindex,nofollow" />
					<meta name="google" content="nositelinkssearchbox" key="sitelinks" />
					<meta name="google" content="notranslate" key="notranslate" />
					
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
