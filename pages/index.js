import Head from 'next/head'
import Home from '../components/home/Home.jsx'
export default function Index() {
  return (
    <div id="root">
      <Head>
        <link rel="shortcut icon" href={require('../statics/img/songify.ico')} type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#2d2d2d" />
      </Head>
      <Home />
    </div>
  )
}
