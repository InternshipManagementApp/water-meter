import React , {useCallback, useEffect, useState} from 'react';
import '../Design/waterclock.css';

export default function WaterClock(){
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [constumptitionPair, setConstumptitionPair] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  
  const consumptitionFromAPI = async () => {
    const date = new Date();
    setCurrentDate(date);
    const response = await fetch('http://127.0.0.1:8000/watermeter/'+ months[selectedMonth]);

    const consumptition = await response.json()
    const pairs = [];
    for (const cons of consumptition) {
      const room = await getRoomById(cons.roomId);
      pairs.push({
        roomNumber: room,
        number: cons.meterNumber,
      });
    }
    setConstumptitionPair(pairs);
  }

  useEffect( () => {
    consumptitionFromAPI();
  }, [selectedMonth]);

  const getRoomById = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/room/'+id); 
      const data = await response.json();
      return data.roomNumber; 
    } catch (error) {
      console.error(`Hiba a szoba lekérésekor az azonosító alapján (${id}):`, error);
      return null;
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <div className="main_partWaterClock">
      <p className="waterclock_title">Semester {currentDate.getFullYear() - 1}/{currentDate.getFullYear()}</p>
      <div className="header">
        <p className="month_title">{months[selectedMonth]}</p>
      </div>
      <div className="consumptitions">
            <table className="consumptition_table">
                <tr>
                    <th>Room number</th>
                    <th>Consumptition</th>
                </tr>
                {constumptitionPair.map(c => (
                <tr>
                  <td>{c.roomNumber}</td>
                  <td>{c.number}</td>
                </tr>
                ))}
            </table>
      </div>
      <div className="footer">
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
      </div>
    </div>
  )
};