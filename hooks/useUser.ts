
import { useState, useEffect} from "react"
import { onAuthStateChanged } from "../firebase/client"
import { useRouter } from "next/router"


export const USER_STATES = {
    "NOT_LOGGED": null,
    "NOT_KNOWN": undefined
  }


export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  // montamos la funcion que mantiene la sesion iniciada del usuario cuando se monta el componente
  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  // si el usuario no esta logeado, lo llevamos al indice para q se logee
  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])
  return user

}