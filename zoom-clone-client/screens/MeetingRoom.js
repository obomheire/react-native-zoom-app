import React, { useState, useEffect } from 'react'
import { View, StyleSheet} from 'react-native'
import StartMeeting from '../components/StartMeeting'
import { io } from 'socket.io-client'

let socket

const MeetingRoom = () => {

  const [ name, setName ] = useState()
  const [ roomId, setRoomId ] = useState()
  const [ activeUsers, setActiveUsers ] =useState()

const joinRoom = () => {
  socket.emit('join-room', { roomId, userName: name})
}

  useEffect(() => {
    socket = io("http://192.168.88.130:3000")
    socket.on("connect", () => {
     // console.log(socket.connected); // this wiill log true in the console
     socket.on('all-users', users => {
       console.log('Active Users')
       console.log(users)
       setActiveUsers(users)
     })
    });
  }, [])

  return (
    <View style={styles.container}>
      <StartMeeting
        name={name}
        roomId={roomId}
        setName={setName}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />
    </View>
  );
}

export default MeetingRoom

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
});