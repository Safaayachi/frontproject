import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import nextI18NextConfig from "../i18n/next-i18next.config.js"
import dynamic from "next/dynamic"
import { SWRConfig } from "swr"
const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar")
  },
  { ssr: false }
)
function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any
  return (
    <>
      <TopProgressBar />
      <SWRConfig>
        <AnyComponent {...pageProps} />
      </SWRConfig>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
