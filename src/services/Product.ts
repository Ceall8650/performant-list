import axios from 'axios';

type Response = {
  products: Product[], 
  total: number
}

const Product = {
  async getAll({ pageNumber=1, amountOfPerPage=10 }: {
    pageNumber?: number, amountOfPerPage?: number
  }): Promise<Response> {
   let skip = (pageNumber - 1) * amountOfPerPage

   const { data } = await axios.get(`https://dummyjson.com/products?limit=${amountOfPerPage}&skip=${skip}`)

   return {
     products: data.products,
     total: data.total,
   }
  }
}

export default Product
