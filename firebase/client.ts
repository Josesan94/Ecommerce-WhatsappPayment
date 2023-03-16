import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCemt2R4uQXZGjC0j6qxEZ6G1tlR-C1Z1s',
  authDomain: 'moreira-ecommerce-36ce1.firebaseapp.com',
  projectId: 'moreira-ecommerce-36ce1',
  storageBucket: 'moreira-ecommerce-36ce1.appspot.com',
  messagingSenderId: '193242466626',
  appId: '1:193242466626:web:ed9411fd9af6f27e6860db',
  measurementId: 'G-2P4QWCY361'
};

// inicializamos firebase
(firebase.apps.length === 0) && firebase.initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// mapeamos el usuario


// cambiamos el estado de la autenticacion del usuario
export const onAuthStateChanged = (onChange: any) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      // eslint-disable-next-line no-unneeded-ternary
      const normalizedUser = user ? user : null

      onChange(normalizedUser)

      console.log("normalizedUser", normalizedUser)
    })
}

// metodo para hacer login en google
export const loginWithGoogle = async () => {
  // cremos una instancia del provider
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return await firebase
    .auth()
    .signInWithPopup(googleProvider)

}

// creamos la funcion para crear transacciones con datos  
export const createTransaction = async ({email,userName,products, text}) => {
  try {
    const docRef = await db.collection('transactions').add({
      products,
      email,
      userName,
      createdAt: new Date(),
      text
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
// 7bNWudUJ1gJEeq7vmZx2
// creamos la funcion para obtener los productos del storage
// snapshot: objeto de firebase que nos permitira obtener los  resultados
// export const fetchAllProducts = () => {
//     return db.collection("transactions")
//     .get()
//     .then(snapshot => {
//       return snapshot.docs.map(doc => {

//       })
//     })
// }