import React from 'react'

const paginationcontactform = ({totalposts,postperpage,setCurrentpage,currentpage}) => {
    // let pages = [];
    // for(let i=1; i<=Math.ceil(totalposts/postperpage);i++){
    //     pages.push(i)
    //   }
      const nPages= Math.ceil(totalposts/postperpage)
      // console.log(nPages)
      function prepage (){
        if(currentpage!==1){
          setCurrentpage(currentpage-1)
        }
      }
      function Nextpage (){
        if(currentpage!==nPages){
          setCurrentpage(currentpage+1)
        }}
  return (
    <div className='pagination'>
       <button className={`paginationbuttons ${nPages<=1|| currentpage===1 ? 'displaynon':""}`} onClick={prepage}>Previous</button>

      {/* {pages.map((page,index)=>{
          return <button className='paginationbuttons' key={index} onClick={()=> setCurrentpage(page)}>{page}</button>
        })} */}


<button className={`paginationbuttons ${nPages<= 1 ? 'displaynon':""}`}
           >{ currentpage +" of "+ nPages}</button>
         <button className={`paginationbuttons ${nPages<=1 || currentpage===nPages ? 'displaynon':""}`} onClick={Nextpage}>Next</button>
    </div>
  )
}

export default paginationcontactform;
