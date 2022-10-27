import React, { useEffect } from "react"
import { loginWithGoogle } from "../firebase/client"
import { useRouter } from "next/router"
import { Button } from "@chakra-ui/react"
import useUser from "hooks/useUser"

const USER_STATES = {
  "NOT_LOGGED": null,
  "NOT_KNOWN": undefined
}

const IndexRoute: React.FC = () => {
  const router = useRouter()
  const user = useUser()



 // montamos otro useEffect para q cuando cambie el usuario, lo redirija al home
  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleLogin = () => {
    loginWithGoogle()
      .catch((e) => console.log(e))
  }


  return (
    <>
      {user === USER_STATES.NOT_LOGGED && <Button onClick={handleLogin}>Logeate</Button>}
      {user === USER_STATES.NOT_KNOWN && <span> loading...</span>}
    </>
  )
}

export default IndexRoute

// const total = React.useMemo(()=> {
//   if(!cart.length) return;
//   if (cart) {cart.reduce((total:any, product:any)=> total + product.price * product.quantity)
//   }}
// , [cart])

// //const parsedTotal = parseCurrency(total)

// const quantity = React.useMemo(()=> cart.reduce((acc,item) => acc + item, 0), [cart])
