import React, {useEffect, useState} from 'react';
import '../Design/rooms.css';
import { intervals } from './Rooms';
import images from '../../constants/images';
import {CirclesOfRoom}  from './Rooms';

const AccessControlySystem = () => {
    const [rooms, setRoom] = useState([]);
    const [roads, setRoad] = useState([]);
    const [users, setUser] = useState([]);
    const [option, setOption] = useState('');
    
    // select data from API
    useEffect( () => {
      roomsFromAPI();
      roadsFromAPI();
      usersFromAPI();
    }, []);
  
    const roomsFromAPI = async () => {
      const responce = await fetch('https://localhost:7110/api/Room/allRooms');
      setRoom(await responce.json());
    }

    const roadsFromAPI = async () => {
      const responce = await fetch('https://localhost:7110/api/Road/allRoads');
      setRoad(await responce.json());
    }

    const usersFromAPI = async () => {
        const responce = await fetch('https://localhost:7110/api/User/allUsers');
  
        setUser(await responce.json())
    }

    // convert time (hour:minute:second) to second
    function convertTime(roadsArray){
      let timeInSecondsWithRoom = [], element;

      for(element of roadsArray){
        let aux = element.time.split("T");
        let splitTime = aux[1].split(":");
        let seconds = parseInt(splitTime[0]) *3600 + parseInt(splitTime[1]) * 60 + parseInt(splitTime[2]);
        let pairOfRoomAndSecond = ['roomId','second']; //pair of roomId and second

        let obj = {};
        obj[pairOfRoomAndSecond[0]] = element.roomId;
        obj[pairOfRoomAndSecond[1]] = seconds;
        timeInSecondsWithRoom.push(obj);
      }   
      return timeInSecondsWithRoom;
    }

    //to save spent time in room
    function saveSpentTimeInARoom(roomsArray, timeInSecWRoom)
    {
      let pairOfRoomAndEllapsedTime = ['roomName', 'sumOfSecond', 'x_start', 'x_end', 'y_start', 'y_end']; //the total time spent in the room
      let roomWithTotalTime = [];

      for(let element of roomsArray)
      {
        let obj = {}
        obj[pairOfRoomAndEllapsedTime[0]] = element.name;
        obj[pairOfRoomAndEllapsedTime[1]] = 0;
        obj[pairOfRoomAndEllapsedTime[2]] = element.xStart;
        obj[pairOfRoomAndEllapsedTime[3]] = element.xEnd;
        obj[pairOfRoomAndEllapsedTime[4]] = element.yStart;
        obj[pairOfRoomAndEllapsedTime[5]] = element.yEnd;
        roomWithTotalTime.push(obj);
      }

      //ellapsed time
      for(let i = 1 ; i < timeInSecWRoom.length -1 ; ++i)
      {
        let ellapsedSecond = timeInSecWRoom[i+1].second - timeInSecWRoom[i].second; 
        roomWithTotalTime[timeInSecWRoom[i].roomId - 1].sumOfSecond += ellapsedSecond;
      }
      return roomWithTotalTime
    }
    
    // heatMap of Image
    useEffect(() => {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      const image = new Image();
      image.src = images.floor_plan;

      image.onload = () => {
        ctx.drawImage(image, 0, 0, 800, 600);
        if(option === "allOption")  // if is choosed: "Everybody"
        {
          let sumOfRoomWithTotalTime = [];
          let roomWithTotalTime;

          // The total duration - per users and rooms
          users.forEach((user) => {
            let onePartOfRoads = roads.filter(element => element.userId === user.userId);
            let timeInSecondsWithRoom = convertTime(onePartOfRoads);
            roomWithTotalTime = saveSpentTimeInARoom(rooms, timeInSecondsWithRoom);
            sumOfRoomWithTotalTime.push(roomWithTotalTime);
          })
          
          // The total durationn - per rooms
          for (let i = 0; i < sumOfRoomWithTotalTime.length-1; i++) {
            for (let j = 0; j < roomWithTotalTime.length; j++) {
              roomWithTotalTime[j].sumOfSecond += sumOfRoomWithTotalTime[i][j].sumOfSecond;
            }
          }

          // check which interval the value falls into
          for (let i = 0; i < roomWithTotalTime.length; i++) {
            for (let j = 0; j < intervals.length; j++) {
              if( roomWithTotalTime[i].sumOfSecond >= intervals[j].start && roomWithTotalTime[i].sumOfSecond <= intervals[j].end)
              {
                let room = new CirclesOfRoom(i, roomWithTotalTime[i].name, 50); // create circle and draw it 
                room.coloringOneCircle(ctx, (roomWithTotalTime[i].x_end + roomWithTotalTime[i].x_start) / 2,
                                        (roomWithTotalTime[i].y_end + roomWithTotalTime[i].y_start) / 2, intervals[j].color);
              } 
              else if (roomWithTotalTime[i].sumOfSecond > intervals[intervals.length-1].end) 
              {
                let room = new CirclesOfRoom(i, roomWithTotalTime[i].name, 50); // create circle and draw it 
                room.coloringOneCircle(ctx, (roomWithTotalTime[i].x_end + roomWithTotalTime[i].x_start) / 2,
                                        (roomWithTotalTime[i].y_end + roomWithTotalTime[i].y_start) / 2, intervals[intervals.length-1].color);
              }
            }
          }
        }
        else if(parseInt(option) > 0) // if is choosed one person {option = id}
        {
          function getAllRoadsByUser(){ 
            return new Promise((resolve) => { // it only runs once
              setTimeout(async () => {
                resolve((await fetch('https://localhost:7110/api/Road/allRoadsOfUser?id=' + option)).json())
              },1000)
            })
          }
          
          let promiseObj = []
          promiseObj.push(getAllRoadsByUser());
          promiseObj[0].then( // to reach one part of the Promise object
            (roadById) => {
              let timeInSecondsWithRoom = convertTime(roadById);
              let roomWithTotalTime = saveSpentTimeInARoom(rooms, timeInSecondsWithRoom);

              for (let i = 0; i < roomWithTotalTime.length; i++) {
                intervals.forEach( interval => {
                  let sumOfSecond = parseInt(roomWithTotalTime[i].sumOfSecond);
                  let startOfInterval = parseInt(interval.start);
                  let endOfInterval = parseInt(interval.end);

                  if(sumOfSecond >= startOfInterval && sumOfSecond <= endOfInterval)
                  {
                    let room = new CirclesOfRoom(i, roomWithTotalTime[i].roomName, 50); // create circle and draw it 
                    room.coloringOneCircle(ctx, (roomWithTotalTime[i].x_end + roomWithTotalTime[i].x_start) / 2,
                                            (roomWithTotalTime[i].y_end + roomWithTotalTime[i].y_start) / 2, interval.color);
                  }
                })
              }
            });
        }
      };
    }, [roads, rooms, option, users]); // variables of useEffect
    
    // change the image by option
    const switchImage = () => {
      setOption(document.querySelector("#list").value);
    };
    
    return (
        <div className="content">
          <select className="listbox" id= "list" onClick={switchImage}>
            <option value="firstOption">Choose:</option>
            <option value="allOption">Everybody</option>
            {users.map((user) => (
              <option value={user.userId}>{user.name}</option>
            ))}
          </select><br></br>
          
          <canvas id="myCanvas" width="800" height="600">
            Your browser does not support the HTML canvas tag.
          </canvas>
        </div>
    )
};

export default AccessControlySystem;