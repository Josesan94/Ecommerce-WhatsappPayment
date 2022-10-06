import React from 'react'
import { ChakraProvider, Container,Stack,  VStack, Image, Heading, Text, Box, Divider, Link, Flex } from '@chakra-ui/react'

const INFORMATION = {
  avatar: "https://res.cloudinary.com/dmngxejbu/image/upload/v1662849506/cld-sample-4.jpg",
  banner: "https://res.cloudinary.com/dmngxejbu/image/upload/v1662849506/cld-sample-4.jpg",
  title: "Moreira hnos.",
  description: "Galardonada pizza estilo New Haven en Palermo SOHO.",
  phone: `5491141414141`,
  social: [
    {
      name: "instagram",
      url: `https://instagram.com/goncy.js`,
    },
    {
      name: "whatsapp",
      url: `https://wa.me/5491141414141`,
    },
  ],
};



const HomeLayout:React.FC = () => {
  
    
  return (
    <>
            <Stack marginBottom={4} spacing={4}>
              <Image 
                alt="" 
                borderRadius="lg"
                height="100%"
                maxHeight={64}
                objectFit="cover"
                src={INFORMATION.banner}
              />
              <Stack
                alignItems="center"
                direction={{base: "column", sm: "row"}}
                spacing={{base: 3, sm: 6}}
              >
                <Box
                  backgroundColor="white"
                  borderRadius={9999}
                  marginTop={{base: -12, sm: -16}}
                  minWidth={{base: 24, sm: 32}}
                  padding={1}
                >
                  <Image
                    alt=""
                    borderRadius={9999}
                    height={{base: 24, sm: 32}}
                    src={INFORMATION.avatar}
                    width={{base: 24, sm: 32}}
                  />
                </Box>
                <Stack
                  alignItems={{base: "center", sm: "flex-start"}}
                  spacing={3}
                  textAlign={{base: "center", sm: "left"}}
                >
                  <Stack spacing={0}>
                    <Heading>{INFORMATION.title}</Heading>
                    <Text color="gray.500" fontWeight="500">
                      {INFORMATION.description}
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    {INFORMATION.social.map((social) => (
                      <Link key={social.name} isExternal href={social.url}>
                        <Flex
                          alignItems="center"
                          backgroundColor="primary.500"
                          borderRadius={9999}
                          color="white"
                          height={10}
                          justifyContent="center"
                          width={10}
                        >
                          <Image
                            alt=""
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                          />
                        </Flex>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
    </>
  )
}

export default HomeLayout