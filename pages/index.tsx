
import { GetStaticProps } from 'next';
import React, {useEffect, useState} from 'react'
import api from '../product/api';
import { Product } from '../product/types';
import {Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion'

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
  const [selectedImage, setSelectedImage] = useState<string>(null)

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

  useEffect(()=> {
    setTimeout(()=> setCart([]), 3000);
  }, [cart]);
  

  return (
    <>
      <AnimateSharedLayout>
        <Stack spacing={6} borderRadius="md" padding={4}>
          <Grid
            gridGap={6}
            templateColumns="repeat(auto-fill,minmax(240px, 1fr))"
          >
            {products.map((product) => (
              <Stack
                spacing={3}
                backgroundColor="gray.100"
                borderRadius="md"
                padding={4}
                key={product.id}
              >
                <Image
                  alt={product.title}
                  as={motion.img}
                  cursor="pointer"
                  layoutId={product.image}
                  borderRadius="md"
                  maxHeight={128}
                  objectFit="cover"
                  src={product.image}
                  onClick={() => setSelectedImage(product.image)}
                />
                <Stack spacing={3}>
                  <Text>{product.title}</Text>
                  <Text color="green.500" fontSize="sm">
                    {parseCurrency(product.price)}
                  </Text>
                </Stack>
                <Button
                  colorScheme="primary"
                  variant="outline"
                  size="sm"
                  onClick={() => setCart((cart) => cart.concat(product))}
                >
                  Agregar
                </Button>
              </Stack>
            ))}
          </Grid>
          <AnimatePresence>
            {Boolean(cart.length) && (
              <Flex
                initial={{scale: 0}}
                animate={{scale: 1}}
                exit={{scale: 0}}
                as={motion.div}
                bottom={4}
                justifyContent="center"
                alignItems={"center"}
              >
                <Button
                  padding={4}
                  width="fit-content"
                  as={Link}
                  href={`https://wa.me/38534543534?text=${encodeURIComponent(
                    text
                  )}`}
                  isExternal
                  colorScheme="primary"
                >
                  Completar pedido ({cart.length} productos)
                </Button>
              </Flex>
            )}
          </AnimatePresence>
        </Stack>
        <AnimatePresence>
          {selectedImage && (
            <Flex
              key="backdrop"
              alignItems="center"
              as={motion.div}
              backgroundColor="rgba(0,0,0,0.5)"
              height="100%"
              justifyContent="center"
              layoutId={selectedImage}
              position="fixed"
              top={0}
              left={0}
              width="100%"
              onClick={() => setSelectedImage(null)}
            >
              <Image alt="image" key="imagen" src={selectedImage} width="50%" />
            </Flex>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
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
