import axios from "axios";
import { Product } from "./types"
import Papa from 'papaparse'


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vSm0ajAhcbEV-V1Zra31uoSkKeK3oZMJ5J0dyRM-a5T8ld-zO1DSBGe0SwrUC4vUc6nJepGDuZkxPD2/pub?output=csv`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        return new Promise<Product[]>((resolve,reject) => {
          Papa.parse(response.data,{
            header:true,
            complete: (results) => {
              const products = results.data as 
              Product[] 
              return resolve(products.map((product) => ({
                ...product,
                price: Number(product.price)
              })))
            },
            error:(error) => reject(error.message)
          });
        })
      });
  },
};