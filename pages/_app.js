import Head from 'next/head'

function GlobalStyle() {
    return (
        <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');

        * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: 'Outfit', sans-serif;
            }
            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 

            ::-webkit-scrollbar-track {
	            background-color: #0003;
                border-radius: 3px;
            }

            ::-webkit-scrollbar {
                width: 8px;
                background-color: transparent;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #0004;
                border-radius: 3px;
            }
    `}</style>
    )
}

export default function ({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Aluracord - Verse</title>
                <link rel='icon' href='https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}