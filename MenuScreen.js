import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const MenuScreen = ({ navigation }) => {
   
  
    return (
      <View style = {{marginTop: 40}}>
        <TouchableOpacity style = {{padding: 20, borderBottomWidth: 1, borderTopWidth: 1, borderRadius: 5}} onPress={() => navigation.navigate('User')}>
            <Text>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{padding: 20, borderBottomWidth: 1, borderRadius: 5}} onPress={() => navigation.navigate('Login')}>
            <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default MenuScreen;
  