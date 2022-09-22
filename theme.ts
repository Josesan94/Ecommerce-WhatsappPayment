
//usaremos la api de chakra para generar nuestros propios themes

import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors:{
      primary: theme.colors['teal']
    },
    styles:{
      global:{
        body: {
          backgroundColor:"primary.50"
        }
      }
    }
})