import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerProps,
    Button,
    Link,
    Stack,
    Text,
    CloseButton
  } from '@chakra-ui/react'

  interface Props extends Omit<DrawerProps, "children"> {
    onClose: ()=> void;
    isOpen: boolean;
    cart: any[];
    parseCurrency:(arg0: number)=> string;
  }

const CartDrawer: React.FC<Props> = ({onClose, isOpen, cart, parseCurrency, ...props}) => {

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
            <p>Carrito</p>
          </DrawerBody>
          <DrawerFooter paddingX={4}>
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
              Completar pedido
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CartDrawer;