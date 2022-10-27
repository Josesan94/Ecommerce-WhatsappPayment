import { GetStaticProps } from "next"
import React, { useState } from "react"

import api from "../product/api"
import { Product } from "../product/types"
import ProductCard from "../product/components/ProductCard"
import SelectedImage from "../product/components/SelectedImage"
import {
  Button,
  Flex,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import CartDrawer from "../cart/components/cartDrawer/cartDrawer"
import useUser from "hooks/useUser"

interface Props {
  products: Product[]
}

function parseCurrency(value: any): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })
}

const ProductsList: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(null)
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)

  const user = useUser()

  return (
    <>
    {!user && <span>Debes estar logeado...</span>}
      <Stack spacing={6}>
        {products.length > 0 ? (
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
                  <Text fontSize="md">Ver pedido</Text>
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
          <SelectedImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// la prop revalidate, actualizara la informacion de la google sheet cada cierto periodo de tiempo
export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list()

  return {
    revalidate: 10,
    props: {
      products,
    },
  }
}

export default ProductsList
