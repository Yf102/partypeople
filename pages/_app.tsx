import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from 'store/store'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}${
    router.asPath.split('?')[0]
  }`

  return (
    <>
      <Head>
        <title key='title'>Party People</title>
        <meta key='description' name='description' content='Party People' />
        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph */}
        <meta key='og-title' property='og:title' content='Party People' />
        <meta
          key='og-description'
          property='og:description'
          content='Party People'
        />
        <meta property='og:url' content={canonicalUrl} />
        {/* Open Graph */}

        <meta
          name='viewport'
          content='width=device-width,minimum-scale=1,maximum-scale=5,initial-scale=1'
        />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
