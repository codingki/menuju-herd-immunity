import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script
						dangerouslySetInnerHTML={{
							__html: `<script
                                        async
                                        src="https://www.googletagmanager.com/gtag/js?id=G-3EXFY85QF0"
                                    ></script>
                                    <script>
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag() {
                                            dataLayer.push(arguments);
                                        }
                                        gtag('js', new Date());
                            
                                        gtag('config', 'G-3EXFY85QF0');
                                    </script>`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
