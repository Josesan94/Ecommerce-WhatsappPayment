
import { GetStaticProps } from 'next';
import React, {useEffect, useState} from 'react'
import api from '../product/api';
import { Product } from '../product/types';
import CartProvider from "../cart/context";
import {Field} from "../cart/types";
import ProductCard from '../product/components/ProductCard';
import SelectedImage from '../product/components/SelectedImage';
import {Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion'
import CartDrawer from '../cart/components/cartDrawer/cartDrawer';





interface Props {
  products: Product[];
};

function parseCurrency(value:any): string {
  return value.toLocaleString('es-AR', {
    style:"currency",
    currency:"ARS"
  })
}


const IndexRoute: React.FC<Props> = ({products}) => {

  const [cart,setCart] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(null)
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);

  // const total = React.useMemo(()=> {
  //   if(!cart.length) return; 
  //   if (cart) {cart.reduce((total:any, product:any)=> total + product.price * product.quantity)
  //   }}
  // , [cart])

  // //const parsedTotal = parseCurrency(total)

  // const quantity = React.useMemo(()=> cart.reduce((acc,item) => acc + item, 0), [cart])

  

  return (
    <>
      <AnimateSharedLayout>
        <Stack spacing={6}>
          {products.length ? (
            <Grid
              gridGap={8}
              templateColumns={{
                base: "repeat(auto-fill, minmax(240px, 1fr))",
                sm: "repeat(auto-fill, minmax(360px, 1fr))",
              }}
            >
              <ProductCard
                products={products}
                setCart={setCart}
                setSelectedImage={setSelectedImage}
              />
            </Grid>
          ) : (
            <Text color="gray.500" fontSize="lg" margin="auto">
              No hay productos
            </Text>
          )}
          <AnimatePresence>
            {Boolean(cart.length) && (
              <Flex
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                as={motion.div}
                bottom={4}
                justifyContent="center"
                alignItems={"center"}
                position="sticky"
              >
                <Button
                  boxShadow="xl"
                  colorScheme="primary"
                  data-testid="show-cart"
                  size="lg"
                  width={{ base: "100%", sm: "fit-content" }}
                  onClick={() => toggleCart(true)}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                      <Text fontSize="md">
                        Ver pedido
                      </Text>
                      <Text
                        backgroundColor="rgba(0,0,0,0.25)"
                        borderRadius="sm"
                        color="gray.100"
                        fontSize="xs"
                        fontWeight="500"
                        paddingX={2}
                        paddingY={1}
                      >
                        {cart.length} items
                      </Text>
                    </Stack>
                </Button>
                {isCartOpen && (
                  <CartDrawer
                  cart={cart}
                  parseCurrency={parseCurrency}
                  isOpen
                  onClose={() => toggleCart(false)}
                />
                )}
                
              </Flex>
            )}
          </AnimatePresence>
        </Stack>
        <AnimatePresence>
          {selectedImage && (
            <SelectedImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
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
