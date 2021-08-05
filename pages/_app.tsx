import { AppProps } from 'next/app'
import 'normalize.css'
import '../styles/all.sass'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
