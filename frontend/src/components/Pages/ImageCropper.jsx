import React, {useState} from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import '../Design/imagecropper.css'


const ImageCropper = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [src, selectFile] = useState(null);

  const handleFileChange = e=>{
    selectFile(URL.createObjectURL(e.target.files[0]))
  }

  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({aspect: 16/9});
  const [cropImg, setCropImg] = useState(null);

  const [showResult, setShowResult] = useState('');
 
  const getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    console.log(crop);
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Failed to create blob');
          reject(new Error('Blob creation failed'));
          return;
        }
        resolve(blob);
      }, 'image/jpg'); // Választhatod a kép formátumát
    });
    
  }

  const handleCropImage = async () => {
    try {
      const croppedBlob = await getCroppedImg();
      setCropImg(URL.createObjectURL(croppedBlob)); // beállítjuk a cropped képet a cropImg állapotba
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append('roomNumber', roomNumber);
      const croppedImageResponse = await fetch(cropImg);
      const croppedImageBlob = await croppedImageResponse.blob();
      formData.append('file', croppedImageBlob);
      await fetch("http://127.0.0.1:8000/watermeter/uploadWaterMeter", {
        method: "POST",
        body: formData
        }).then(response => {
            if (response.status >= 200 && response.status < 300){
                return response.json();
            } else {
            console.log('Something went wrong');
            alert("Sorry, is a problem with the server!")
            }
        })
        .then(data => {
          setShowResult(data);
        })
        .catch(err => err); 
    
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const d = new Date();
    let monthName = month[d.getMonth()];
    console.log(showResult.msg);
    await fetch('http://127.0.0.1:8000/watermeter/'+roomNumber+'/'+ monthName, {
      method: "PUT",
      cache: 'no-cache',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          meterNumber: showResult.msg
          }),
      }).then(response => {
          if (response.status >= 200 && response.status < 300){
            alert("Thank you!");
              
          } else {
          console.log('Somthing happened wrong');
          alert("Sorry , is a problem with the server!")
          }
      }).catch(err => err);
    
  }

  return(
    <div className="main_partImgCrop">
      <p className="uploadImg_title">Upload constumptition</p>
      <div className="upload">
          <form onSubmit={handleSubmit} className="uploadNumber">
                <div className="inputs">
                    <h2>Upload the consumptition:</h2>
                    <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} type="text" name="roomnumber" id="roomnumber" placeholder="Room Number" required/>
                    <h3>Add Image:</h3>
                    <div className='uploadImg'>
                      <input type='file' accept='image/*' onChange={handleFileChange}/>
                    </div>
                    {src &&  <div className='reactcrop'>
                          <ReactCrop
                          style={{maxWidth: "100%"}}
                          crop={crop}
                          onChange={setCrop}
                      >
                          <img
                            src={src}
                            onLoad={(e) => {
                              // check if the element HTMLImageElement
                              if (e.target instanceof HTMLImageElement) {
                                setImage(e.target);
                              }
                            }}
                          alt='Original'/>
                      </ReactCrop>
                      <button type="button" className='btnCrop' onClick={handleCropImage}>Crop Image</button>
                    </div>}
                    {cropImg && <div className='cropImg'>
                      <img src={cropImg} alt='Cropped' className='img-fluid'/>
                      </div>} 
                    <button type="submit" name="submit" className="btnUpload">Send!</button>
                </div>

               
          </form>
          {showResult && (
            <div className='result'>
                <h3>Please check the result and correct it where necessary:</h3>
                <input type="text" name="cons" id="cons" placeholder="Consumption" value= {showResult.msg}  onChange={(e) => setShowResult({ ...showResult, msg: e.target.value })} required/>
                <button type="submit" name="submit" className="btnUpdate" onClick={handleUpdate}>Send!</button>
            </div>
        )}
      </div>
    </div>
  )
};

export default ImageCropper;