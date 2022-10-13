// pages/_app.js
import React from 'react';
import Head from "next/head";
import HomeLayout from '../components/NavBanner';
import { ChakraProvider, Container,Stack,  VStack, Image, Heading, Text, Box, Divider, Link, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import theme from '../theme';


const INFORMATION = {
  avatar: "https://res.cloudinary.com/dmngxejbu/image/upload/v1662849506/cld-sample-4.jpg",
  banner: "https://res.cloudinary.com/dmngxejbu/image/upload/v1662849506/cld-sample-4.jpg",
  title: "Moreira hnos.",
  description: "Galardonada pizza estilo New Haven en Palermo SOHO.",
  phone: `5491141414141`,
  social: [
    {
      name: "instagram",
      url: `https://instagram.com`,
    },
    {
      name: "whatsapp",
      url: `https://wa.me/5491141414141`,
    },
  ],
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
        <title>Tienda online- Moreira</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="Jose Santillan" name="author" />
        <meta content="Jose San" name="copyright" />
        {/* Fin de meta tags de licencia */}
      </Head>
    <ChakraProvider theme={theme}>
        <Container 
        backgroundColor="white"
        boxShadow="md"
        borderRadius="sm"
        marginY={4}
        maxWidth="container.xl"
        padding={4}
        >
          <HomeLayout/> 
          <Component {...pageProps} />  
          <Divider marginY={8}/>
          {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
          <Text textAlign="center">
            © Copyright {new Date().getFullYear()} {" "}
            Jose Santillan.
          </Text>
          {/* Fin de copyright */}
        </Container>
    </ChakraProvider>
    </>
  )
}

export default App;