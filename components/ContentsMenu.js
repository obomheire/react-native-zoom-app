import React from 'react'
import { View, Text, StyleSheet, Image, FlatList} from 'react-native'
import { AntDesign } from 'react-native-vector-icons'

const itemsMenuButton = [
    {        
        type: 'starred',
        name: 'star'
    },
    {
        type: 'item',
        name: 'img1',
        photo: require('../assets/img1.jpg')
    },
    {
        type: 'item',
        name: 'img2',
        photo: require('../assets/img2.jpg')
    },
    {
        type: 'item',
        name: 'img3',
        photo: require('../assets/img3.jpg')
    }
]

const ContentsMenu = () => {
  return (
    <View style={styles.container}>
         {itemsMenuButton.map((item, index) => 
               <View style={styles.row} key={index}>
                   {item.type === 'starred' ? (
                    <View style={styles.starredIcon}>
                        <AntDesign name='star' size={30} color='#efefef'/>
                    </View>
                   ) : (
                      <Image source={item.photo} style={styles.image}/>
                   )}

               <Text style={styles.text}>{item.name}</Text>
           </View>
         )}
    </View>
  );
}

export default ContentsMenu

const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    starredIcon: {
        backgroundColor: '#333333',
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    text: {
        color: 'white',
        paddingLeft: 15,
        fontSize: 18
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 20
    }
})

/*
const ContentsMenu = () => {
    return (
        <View style={styles.container}>
           <FlatList
           data={itemsMenuButton}
           keyExtractor={value => value.name}
           renderItem = {({item}) => {
            return (
                <View style={styles.row}>
                    {item.type === 'starred' ? (
                        <View style={styles.starredIcon}>
                            <AntDesign name='star' size={30} color='#efefef'/>
                        </View>
                   ) : (
                      <Image source={item.photo} style={styles.image}/>
                   )}
                   <Text style={styles.text}>{item.name}</Text>
              </View>
            )
           }}
          />
        </View>
      );
  }
*/
