import React, { useState } from 'react'

type PaginationProps = {
  totalPages: number,
  change: Function,
}

function Pagination({ totalPages, change }: PaginationProps) {
  const FIRST_PAGE_NUMBER = 1
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER)

  function next() {
    if (currentPage >= totalPages) {
      return
    }

    setCurrentPage(prev => {
      let newPageNumber = prev + 1

      change(newPageNumber)

      return newPageNumber
    })
  }

  function back() {
    if (currentPage <= FIRST_PAGE_NUMBER) {
      return
    }

    setCurrentPage(prev => {
      let newPageNumber = prev - 1

      change(newPageNumber)

      return newPageNumber
    })
  }

  return (
    <div className='inline-flex items-center'>
      <button onClick={back}>&lt;</button>
      <span className='px-3'>Page {currentPage}/{totalPages}</span>
      <button onClick={next}>&gt;</button>
    </div>
  )
}

export default Pagination