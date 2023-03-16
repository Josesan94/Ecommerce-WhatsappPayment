import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Product } from '../../product/types'
import { Button, Flex, Grid, Image, Link, Modal, ModalContent, Stack, Text, useDisclosure, ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import SelectedProduct from './SelectedImage'

interface Props {
  products: Product[]
  setCart: Dispatch<SetStateAction<Product[]>>
};

function parseCurrency (value: any): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

const ProductCard: React.FC<Props> = ({ products, setCart }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {products.map((product) => (
        <Stack
          alignItems="center"
          data-testid="product"
          direction="row"
          justifyContent="center"
          key={product.id}
        >
          <Stack direction="column" alignItems="center" padding={2} spacing={4} width="75%">
            <Image
              alt={product.title}
              as={motion.img}
              cursor="pointer"
              layoutId={product.image}
              borderRadius="md"
              maxHeight={128}
              width="75%"
              objectFit="cover"
              src={product.image}
              onClick={onOpen}
            />
            <Stack 
            direction="column" alignItems="center" spacing={2} width="100%">
              <Stack spacing={1} alignItems="center" >
                <Text fontSize="25px" fontWeight="500">{product.title}</Text>
                <Text color="gray.500" fontSize="md">
                  {product.description}
                </Text>
                <Text color="yellow.500" fontSize="20px" fontWeight="500">
                  {parseCurrency(product.price)}
                </Text>
              </Stack>
              <Stack width="100%">
                
                <Button
                  size="md"
                  onClick={() => setCart((cart) => cart.concat(product))}
                >
                  Agregar
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {/* <Modal  isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Modal
          </ModalBody>
              </ModalContent>
          </Modal> */}
            <SelectedProduct
            isOpen={isOpen}
            onClose={onClose}
            product={product}
          />
        </Stack>
      ))}
    </>
  )
}

export default ProductCard
