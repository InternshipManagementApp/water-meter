import React , {useState} from 'react';
import '../Design/waterclock.css';

const WaterClock = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('roomNumber', roomNumber);
      formData.append('file', file);
      await fetch("http://127.0.0.1:8000/watermeter/uploadWaterMeter", {
        method: "POST",
        body: formData
        }).then(response => {
            if (response.status >= 200 && response.status < 300){
                alert("Success uploading!");
            } else {
            console.log('Somthing happened wrong');
            alert("Sorry , is a problem with the server!")
            }
        }).catch(err => err); 
    }
  return (
    <div className="main_part">
      <p className="page_title">Semester 2023/2024</p>
      <div className="upload">
        <form onSubmit={handleSubmit} className="uploadNumber">
              <div className="inputs">
                  <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} type="text" name="roomnumber" id="roomnumber" placeholder="Room Number" required/>
              </div>
              <h2>Add Image:</h2>
              <input type="file" onChange={handleChange} />
              <div className="inputs">
                  <button name="submit" className="btnImg">Send!</button>
              </div>
        </form>
      </div>
      <div className="header">
        <p className="month_title">September</p>
      </div>
      <div className="consumptitions">
            <table className="consumptition_table">
                <tr>
                    <th>Room number</th>
                    <th>Consumptition</th>
                </tr>
            </table>
      </div>
      <div className="footer">
        <input type="text" placeholder="Search.."/>
        <button >Previous</button>
        <button >Next</button>
      </div>
    </div>
  )
};

export default WaterClock;