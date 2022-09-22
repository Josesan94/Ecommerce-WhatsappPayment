
import { GetStaticProps } from 'next';
import React, {useState} from 'react'
import api from '../product/api';
import { Product } from '../product/types';
import {Button, Flex, Grid, Link, Stack, Text } from '@chakra-ui/react';

interface Props {
  products: Product[];
};

function parseCurrency(value:number): string {
  return value.toLocaleString('es-AR', {
    style:"currency",
    currency:"ARS"
  })
}


const IndexRoute: React.FC<Props> = ({products}) => {

  const [cart,setCart] = useState<Product[]>([])

  // solo se ejecutara cuando cambie el carrito (cart)
  const text = React.useMemo(
    () => 
    cart
      .reduce(
        (message, product) => message.concat(`* ${product.title} -  ${parseCurrency(product.price)}\n`),
        '',
      )
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`),
    [cart],
  );

  console.log(text)
  

  return (
    <Stack spacing={6} borderRadius="md" padding={4} >
      <Grid gridGap={6} templateColumns="repeat(auto-fill,minmax(240px, 1fr))">
      {products.map(product => (
      <Stack 
      spacing={3} 
      backgroundColor="gray.100" 
      borderRadius="md" 
      padding={4}
      key={product.id}>
        <Stack spacing={3}>
          <Text>{product.title}</Text>
          <Text color="green.500" fontSize="sm">{parseCurrency(product.price)}</Text>
        </Stack>
        <Button 
        colorScheme="primary" 
        variant="outline" 
        size="sm"
        onClick={()=> setCart(cart => cart.concat(product))}>Agregar</Button>
      </Stack>))}
    </Grid>
    {Boolean(cart.length) && ( 
      <Flex bottom={4} justifyContent="center" alignItems={"center"} >
        <Button 
        padding={4}
        width="fit-content"
        as={Link} 
        href={`https://wa.me/38534543534?text=${encodeURIComponent(text)}`} 
        isExternal 
        colorScheme="whatsapp"
        >
        Completar pedido ({cart.length} productos) 
        </Button>
      </Flex>
    )} 
    </Stack>
    )
};


//la prop revalidate, actualizara la informacion de la google sheet cada cierto periodo de tiempo
export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props:{
      products,
    },
  };
};

export default IndexRoute;
