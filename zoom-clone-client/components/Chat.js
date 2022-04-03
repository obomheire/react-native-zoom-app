import React, { useState } from 'react'
import {KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import ChatHeader from './ChatHeader'
import { FontAwesome } from 'react-native-vector-icons'

const Chat = ({ setModalVisible }) => {

    const [ messageText, setMessageText ] = useState()
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: "100%" }}>
          {/* in IOS the text field will be hiden when the keyboard is up, KeyboardAvoidingView will correct that*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
            {/* TouchableWithoutFeedback will dismiss the keyboard if an empty space is clicked
            NB: TouchableWithoutFeedback must contain only one element hence we wrap all the cpntents in one View */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
              <ChatHeader setModalVisible={setModalVisible} />
              {/* Chat Messages */}
              <View style={styles.chatMessages}></View>
              {/* Type Messages */}
              <View style={styles.chatFormContainer}>
                <Text style={{ color: "white" }}> Sent to: Everyone</Text>
                <View style={styles.chatForm}>
                  <TextInput
                    value={messageText}
                    onChangeText={setMessageText}
                    style={styles.textInput}
                    placeholderTextColor="#595859"
                    placeholder="Tap here to chat"
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: messageText ? "#0b71eb" : "#373838",
                    }}
                  >
                    <FontAwesome name={"send"} size={18} color="#efefef" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c'
    },
    chatFormContainer: {
        borderColor: '#2f2f2f',
        borderTopWidth: 1,
        padding: 12
    },
    textInput: {
        height: 40,
        color: '#efefef',
        borderColor: '#595859',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 12,
        flex: 1
    },
    chatForm: {
        flexDirection: 'row'
    },
    button: {
        height: 40,
        width: 40,
        marginTop: 12,
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    chatMessages: {
        flex: 1
    }
})