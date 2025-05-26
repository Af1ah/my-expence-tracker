import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { router } from 'expo-router'
import styles from '../styles/historyStyles'
import { MaterialIcons } from '@expo/vector-icons'

export class AddTransactionButton extends Component {
  render() {
    return (
       <View className="absolute bottom-6 right-6 z-50">
      <TouchableOpacity
        onPress={() => router.push("../../addtransaction")}
        className="bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-80"
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
    )
  }
}

export default AddTransactionButton