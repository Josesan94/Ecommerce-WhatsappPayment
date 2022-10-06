
import React, {useEffect, useState} from 'react'
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion'
import Home from '../components/Home';



const IndexRoute: React.FC = () => {



  // const total = React.useMemo(()=> {
  //   if(!cart.length) return; 
  //   if (cart) {cart.reduce((total:any, product:any)=> total + product.price * product.quantity)
  //   }}
  // , [cart])

  // //const parsedTotal = parseCurrency(total)

  // const quantity = React.useMemo(()=> cart.reduce((acc,item) => acc + item, 0), [cart])

  

  return (
    <>
      <AnimateSharedLayout>
        <Home/>
      </AnimateSharedLayout>
    </>
  );
};



export default IndexRoute;
