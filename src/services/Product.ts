import axios from 'axios';

type Response = {
  products: Product[], 
  total: number
}

const Product = {
  async getProductsBySkip({ skip, amountOfProducts=10 }: {
    skip?: number, amountOfProducts?: number
  }): Promise<Response> {

   const { data } = await axios.get(`https://dummyjson.com/products?limit=${amountOfProducts}&skip=${skip}`)

   return {
     products: data.products,
     total: data.total,
   }
  }
}

export default Product
