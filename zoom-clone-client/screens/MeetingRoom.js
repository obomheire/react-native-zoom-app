import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import StartMeeting from '../components/StartMeeting'
import { io } from 'socket.io-client'
import { Camera } from 'expo-camera';
import { FontAwesome } from 'react-native-vector-icons'

const menuIcons = [
  {
      id: 1,
      name: 'microphone',
      title: 'Mute',
      customColor: '#efefef'
  },
  {
      id: 2,
      name: 'video-camera',
      title: 'Stop Video',
  },
  {
    id: 3,
    name: 'upload',
    title: 'Share Screen'
},
  {
      id: 4,
      name: 'group',
      title: 'Participants'
  }
]


let socket

const MeetingRoom = () => {

  const [ name, setName ] = useState()
  const [ roomId, setRoomId ] = useState()
  const [ activeUsers, setActiveUsers ] =useState(['Zack', 'Ibrahim'])
  const [ startCamera, setStartCamera ] = useState(false)
console.log(activeUsers)
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
      //  console.log('Active Users')
      //  console.log(users)
      //  setActiveUsers(users)
     })
    });
  }, [])

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.activeUsersContainer}>
          <View style={styles.cameraContainer}>
            <Camera
              type={"front"}
              style={{
                 width: activeUsers.length == 0 ? "100%" : 200, 
                 height: activeUsers.length == 0 ? 400 : 150 
                }}
            >
            </Camera>
            {activeUsers.map((user, index) =>  
                <View key={index} style={styles.activeUserContainer}>
                  <Text style={{color: 'white'}}>{user}</Text>
                </View>  
            )}
          </View>
        </View>
          {/* Footer */}
          <View style={styles.menu}>
            {menuIcons.map((icon, index) => (
              <TouchableOpacity style={styles.tile} key={index}>
                <FontAwesome name={icon.name} size={24} color="#efefef" />
                <Text style={styles.textTile}>{icon.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      ) : (
        // Start Meeting Section
        <StartMeeting
          name={name}
          roomId={roomId}
          setName={setName}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )}
    </View>
  );
}

export default MeetingRoom

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 15
  },
  textTile: {
    color: 'white',
    marginTop: 10
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cameraContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  activeUsersContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  activeUserContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});