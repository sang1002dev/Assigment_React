import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const NotificationScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>aaaa</Text>
      <Text style={styles.content}>aaaaa</Text>
      <Text style={styles.time}>aaaa</Text>
    </View>
  );
  
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      borderColor: '#ddd',
      borderWidth: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    content: {
      fontSize: 16,
      marginBottom: 5,
    },
    time: {
      fontSize: 12,
      color: '#666',
    },
  });
export default NotificationScreen