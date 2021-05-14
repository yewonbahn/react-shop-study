import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from "antd";
import axios from "axios";

function FIleUpload(props) {
    const [Images, setImages] = useState([])
    const dropHandler = (files) => {

        // 파일을 전송할 때는 이걸 통해서 전해주어야 한다.
    
        let formData = new FormData();
    
        const config = {
    
          header: { "content-type": "multipart/form-data" },
    
        };
    
        formData.append("file", files[0]);
    
    
    
        axios.post("/api/product/image", formData, config).then((response) => {
    
          if (response.data.success) {
    
            console.log(response.data);
            setImages([...Images, response.data.filePath])
            props.refreshFunction([...Images, response.data.filePath])
    
          } else {
    
            alert("파일을 저장하는데 실패했습니다.")
    
          }
    
        })

  
      }

      const deleteHanlder =(image)=>{

        const currentIndex =Images.indexOf(image);

        let newImages = [...Images]

        newImages.splice(currentIndex,1)
        setImages(newImages)
        props.refreshFunction(newImages)
      }
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <Dropzone onDrop={dropHandler}>
  {({getRootProps, getInputProps}) => (

      <div 
        style={{width:300, height:240, border:'1px solid lightgray',
        display:'flex',alignItems:'center',justifyContent:'center'}}
        {...getRootProps()}>
        <input {...getInputProps()} />
        <Icon type="plus"style={{fontSize:'3rem'}}></Icon>
      </div>

  )}
</Dropzone>
<div style={{display:'flex',width:'350px',height:'240px',overflow:'scroll'}}>

{Images.map((image,index)=>(
<div onClick={()=>deleteHanlder(image)} key={index}>
  <img style={{minWidth:'300px',width:'300px',height:'240px'}}
  src={`http://localhost:5000/${image}`}
  />
  </div>
  ))}
</div>


        </div>
    )
}

export default FIleUpload
