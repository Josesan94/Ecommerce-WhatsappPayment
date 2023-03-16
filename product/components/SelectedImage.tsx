import React, { Dispatch, SetStateAction } from 'react'
import { Flex, Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Product } from 'product/types'

interface Props {
  isOpen:boolean,
  onClose:()=> void,
  product:Product
};

const SelectedProduct: React.FC<Props> = (props) => {
  const { isOpen, onClose, product } = props

  const Overlay = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(1px) hue-rotate(90deg)'
    />
  )


  return (
    <> 
    <Modal isOpen={isOpen} onClose={onClose}>
      <Overlay/>
      <ModalContent>
        <Stack direction="column" alignItems="initial" justifyContent="space-around" gap={3} marginLeft={4}>
        <ModalHeader>{product.title}</ModalHeader>
        <ModalBody>
      <Stack
        gap={4}
        alignItems="initial"
        as={motion.div}
        height="100%"
        width="100%"
      >
        <Image alt="image" key="imagen" src={product.image} width="50%" />
        <Text>{product.description}</Text>
      </Stack>
        </ModalBody>
        </Stack>
        <ModalFooter mr={150}>

            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
      </ModalContent>
      
      </Modal>
    </>
  )
}

export default SelectedProduct;
