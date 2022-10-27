import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Product } from '../../product/types'
import { Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

interface Props {
  products: Product[]
  setCart: Dispatch<SetStateAction<Product[]>>
  setSelectedImage: Dispatch<SetStateAction<string>>
};

function parseCurrency (value: any): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

const ProductCard: React.FC<Props> = ({ products, setCart, setSelectedImage }) => {
  return (
    <>
      {products.map((product) => (
        <Stack
          alignItems="center"
          borderColor="gray.100"
          borderRadius="md"
          borderWidth={1}
          data-testid="product"
          direction="row"
          justifyContent="space-between"
          key={product.id}
        >
          <Stack direction="row" padding={2} spacing={4} width="100%">
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
            <Stack justifyContent="space-between" spacing={1} width="100%">
              <Stack spacing={1}>
                <Text fontSize="lg" fontWeight="500">{product.title}</Text>
                <Text color="gray.500" fontSize="sm">
                  {product.description}
                </Text>
              </Stack>
              <Stack>
                <Text color="green.500" fontSize="sm" fontWeight="500">
                  {parseCurrency(product.price)}
                </Text>
                <Button
                  size="xs"
                  onClick={() => setCart((cart) => cart.concat(product))}
                >
                  Agregar
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default ProductCard
