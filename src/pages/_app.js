import Navbar from '../components/navbar'
import '../components/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
