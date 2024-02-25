import React , {useEffect, useState} from 'react';
import '../Design/waterclock.css';

const WaterClock = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [file, setFile] = useState();
    const [consumptition, SetConsumptition] = useState([]);

    useEffect( () => {
      consumptitionFromAPI();
    }, []);
    const consumptitionFromAPI = async () => {
      const responce = await fetch('http://127.0.0.1:8000/watermeter');
      SetConsumptition(await responce.json());
    }

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
    <div className="main_partWaterClock">
      <p className="waterclock_title">Semester 2023/2024</p>
      <div className="upload">
        <form onSubmit={handleSubmit} className="uploadNumber">
              <div className="inputs">
                  <h2>Upload the consumptition:</h2>
                  <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} type="text" name="roomnumber" id="roomnumber" placeholder="Room Number" required/>
                  <h3>Add Image:</h3>
                  <input  type="file" onChange={handleChange} /> 
                  <button name="submit" className="btnUpload">Send!</button>
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
                {consumptition.map(c => (
                <tr>
                  <td>{c.roomNumber}</td>
                  <td>{c.meterNumber}</td>
                </tr>
                ))}
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