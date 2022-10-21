import React from 'react'

export default function Paginator({ gotoNext, gotoPrev }) {
  return (
    <div>
      {gotoPrev && <button onClick={gotoPrev} >Previous</button>}
      {gotoNext && <button onClick={gotoNext}>NExt</button>}
    </div>
  )
}
