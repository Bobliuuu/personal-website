import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Redux from '@/components/molecules/redux';
import Navbar from '@/components/organisms/navbar'
import Footer from '@/components/organisms/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Redux>
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </Redux>
  );
}
