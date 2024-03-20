import React , {useCallback, useEffect, useState} from 'react';
import '../Design/waterclock.css';

export default function WaterClock(){
  const [consumptition, SetConsumptition] = useState([]);
  const [constumptitionPair, SetConstumptitionPair] = useState([]);

  const consumptitionFromAPI = useCallback(async () => {
    const response = await fetch('http://127.0.0.1:8000/watermeter');
    SetConsumptition(await response.json());
  }, [SetConsumptition])

  const createPairRoomNumberAndCons = useCallback(async () => {
    const pairs = [];
    for (const cons of consumptition) {
      const room = await getRoomById(cons.roomId);
      pairs.push({
        roomNumber: room,
        number: cons.meterNumber,
      });
    }
    SetConstumptitionPair(pairs);
  }, [consumptition, SetConstumptitionPair]);

  useEffect( () => {
    consumptitionFromAPI();
    createPairRoomNumberAndCons();
  }, [consumptitionFromAPI, createPairRoomNumberAndCons]);

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

  return (
    <div className="main_partWaterClock">
      <p className="waterclock_title">Semester 2023/2024</p>
      <div className="header">
        <p className="month_title">September</p>
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
        <input type="text" placeholder="Search.."/>
        <button >Previous</button>
        <button >Next</button>
      </div>
    </div>
  )
};