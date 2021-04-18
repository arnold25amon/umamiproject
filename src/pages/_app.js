import Navbar from '../components/navbar'
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
     
      <Navbar></Navbar>
      <Component {...pageProps} />
        
    </div>
  );
}

export default MyApp;