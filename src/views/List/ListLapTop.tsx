import CardBase from 'components/Card/CardBase';
import Pagination from 'components/Pagination';
import LoadingMask from 'components/LoadingMask';
import useFetchProducts from 'hooks/useProductsApi';
import { useCallback } from 'react';

function ListLaptop() {
  const FIRST_PAGE_NUMBER = 1
  const AMOUNT_OF_PER_PAGE = 5
  const {
    isLoading,
    total,
    products,
    fetchProductsBySkip
  } = useFetchProducts(FIRST_PAGE_NUMBER - 1, AMOUNT_OF_PER_PAGE)
  const totalPages = Math.ceil(total / AMOUNT_OF_PER_PAGE)

  const changePage = useCallback((pageNumber: number) => {
    const skip = (pageNumber - 1) * AMOUNT_OF_PER_PAGE

    fetchProductsBySkip(skip)
  }, [fetchProductsBySkip])

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
        isLoading && <LoadingMask />
      }
    </>
  )
}

export default ListLaptop
