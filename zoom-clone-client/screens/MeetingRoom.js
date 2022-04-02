import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import StartMeeting from '../components/StartMeeting'
import { io } from 'socket.io-client'
import { Camera } from 'expo-camera';

let socket

const MeetingRoom = () => {

  const [ name, setName ] = useState()
  const [ roomId, setRoomId ] = useState()
  const [ activeUsers, setActiveUsers ] =useState()
  const [ startCamera, setStartCamera ] = useState(false)

  const _startCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      if (status === 'granted') setStartCamera(true)
      else Alert.alert('Access Denied')
  }

const joinRoom = () => {
    _startCamera()
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
      {startCamera ? (
        <Text> Start Camera</Text>
      ) : (
        // Start Meeting Section
        <StartMeeting
          name={name}
          roomId={roomId}
          setName={setName}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )
      }
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