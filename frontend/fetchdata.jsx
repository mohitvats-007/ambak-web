import React , { useEffect, useState } from "react";
import Paginationfetchdata from "./paginationfetchdata";

function FetchData() {
  const [records, setRecords] = useState([]);

  const [currentpage,setCurrentpage]= useState(1);
  const [postperpage,setpostperpage]= useState(50);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log(err));
  },[]);

  const lastpostindex   = currentpage*postperpage;
  const firstpostindex  = lastpostindex-postperpage;
  const currentpost     = records.slice(firstpostindex,lastpostindex)
  return (


  
    <>
      <table  className="table table-drak table-striped mt-10">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">id</th>
      <th scope="col">Id</th>
      <th scope="col">postId</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    {currentpost.map((data, index) => {
      return (
        <tr key={index}>
      <th scope="row">{}</th>
      <td>{data.id}</td>
      <td>{data.postId  }</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
    </tr>
      );
    })}
  </tbody>
</table>
<Paginationfetchdata totalposts= {records.length} postperpage={postperpage} setCurrentpage={setCurrentpage}/>
    </>
  );
}

export default FetchData;