import React from 'react'
import CardBase from '../../components/Card/CardBase';
import Pagination from '../../components/Pagination';
import useFetchProducts from '../../hooks/useProductsApi';

function ListLapTop() {
  const FIRST_PAGE_NUMBER = 1
  const AMOUNT_OF_PER_PAGE = 5
  const {
    isLoading,
    totalPages,
    products,
    fetchProducts
  } = useFetchProducts(FIRST_PAGE_NUMBER, AMOUNT_OF_PER_PAGE)

  function changePage(pageNumber: number) {
    fetchProducts(pageNumber)
  }

  return (
    <>
      {
        products &&
        <>
          <div className='space-y-3 mb-3'>
            {
              products.map(product => (
                <CardBase
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  className=''
                />
              ))
            }
          </div>
          <div className='flex justify-center'>
            <Pagination totalPages={totalPages} change={changePage} />
          </div>
        </>
      }
      {
        isLoading
        && <div className='absolute top-0 left-0 w-full h-full bg-black/55 font-semibold text-white text-2xl flex justify-center items-center'>
          Loading...
        </div>
      }
    </>
  )
}

export default ListLapTop
