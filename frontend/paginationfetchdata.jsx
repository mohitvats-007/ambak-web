import React from 'react';
import '/paginatiofetchdata.css';
const paginationfetchdata = ({totalposts,postperpage,setCurrentpage,currentpage}) => {
    let pages = [];
    for(let i=1; i<=Math.ceil(totalposts/postperpage);i++){
        pages.push(i)
      }
const nPages= Math.ceil(totalposts/postperpage)
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
          <button className='paginationbuttons' onClick={prepage}>Previous</button>
      {/* {pages.map((page,index)=>{
          return <button className={`paginationbuttons ${currentpage===page ? 'activebutton':""}`}
           key={index} onClick={()=> setCurrentpage(page)}>{page}</button>
        })} */}
       <button className={`paginationbuttons ${currentpage===currentpage ? 'activebutton':""}`}
           >{currentpage +" of "+ nPages}</button>
        
        <button className='paginationbuttons ' onClick={Nextpage}>Next</button>
        </div>
  );}
export default paginationfetchdata;


