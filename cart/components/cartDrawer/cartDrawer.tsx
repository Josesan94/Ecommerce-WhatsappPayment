import React from "react"
import useUser from "hooks/useUser"

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  Button,
  Link,
  Stack,
  Text,
  CloseButton,
} from "@chakra-ui/react"
import { createTransaction } from "../../../firebase/client"


interface Props extends Omit<DrawerProps, "children"> {
  onClose: () => void
  isOpen: boolean
  cart: any[]
  parseCurrency: (arg0: number) => string
}

const CartDrawer: React.FC<Props> = ({
  onClose,
  isOpen,
  cart,
  parseCurrency,
  ...props
}) => {
  const user = useUser();



  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message: any, product: any) =>
            message.concat(
              `* ${product.title} -  ${parseCurrency(product.price)}\n`
            ),
          ""
        )
        .concat(
          `\nTotal: ${parseCurrency(
            cart.reduce((total: any, product: any) => total + product.price, 0)
          )}`
        ),
    [cart]
  )



  const products = React.useMemo(()=> {
     return cart.map((product)=> product)
  }, [cart])

  console.log(products)


  function handleCart(e: any) {
    e.preventDefault()
    void createTransaction({
      products,
      email: user.email,
      userName:user.username,
      text 
    })
  }


  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} {...props}>
        <DrawerOverlay />
        <DrawerContent paddingTop={4} {...props}>
          <DrawerHeader paddingX={4}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Stack alignItems="center" direction="row">
                {/* {currentStep === "fields" && (
                  <IconButton
                    aria-label="Go back"
                    icon={<ChevronLeftIcon height={8} width={8} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setCurrentStep("details")}
                  />
                )} */}
                <Text fontSize={{ base: "2xl", sm: "3xl" }} fontWeight="500">
                  Tu pedido
                </Text>
              </Stack>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            {cart.map((product:any) => {
              return (
                < >
                <Stack 
                key={product.id}
                direction="row"
                justifyContent="space-between"
                >
                  <Text >{product.title}</Text>
                  <Text >Cantidad: {product.quantity}</Text>
                </Stack>
                </>
              )
            })}
          </DrawerBody>
          <DrawerFooter paddingX={4}>
            <Button
              padding={4}
              width="fit-content"
              as={Link}
              href={`https://wa.me/+5493816807711?text=${encodeURIComponent(
                text
              )}`}
              isExternal
              colorScheme="primary"
              // onClick={handleCart}
            >
              Completar pedido
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CartDrawer
