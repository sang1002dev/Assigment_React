import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const VideoScreen = ({navigation, route}) => {
  return ( 
    <ScrollView style = {{flex: 1, marginTop: 30}}> 
      <View style = {{paddingLeft: 10, paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('./assets/image/avatar.jpg')} style = {{width: 60, height: 60}}/>
        <Text style = {{fontSize: 16, fontWeight: 'bold', paddingLeft: 20}}>React_Native</Text>
      </View>
    </ScrollView>
  )
}

export default VideoScreen