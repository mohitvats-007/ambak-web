import React from 'react'

const paginationcontactform = ({totalposts,postperpage,setCurrentpage}) => {

    let pages = [];
    for(let i=1; i<=Math.ceil(totalposts/postperpage);i++){
        pages.push(i)
      }
  return (
    <div className='pagination'>
      
      {pages.map((page,index)=>{
          return <button className='paginationbuttons' key={index} onClick={()=> setCurrentpage(page)}>{page}</button>
        })}
    </div>
  )
}

export default paginationcontactform
