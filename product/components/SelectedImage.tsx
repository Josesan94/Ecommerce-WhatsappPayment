import React, { Dispatch, SetStateAction } from 'react'
import { Flex, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface Props {
  selectedImage: string
  setSelectedImage: Dispatch<SetStateAction<string>>
};

const SelectedImage: React.FC<Props> = ({ selectedImage, setSelectedImage }) => {
  return (
    <>
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
    </>
  )
}

export default SelectedImage
