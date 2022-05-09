import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import CreateEvent from './CreateEvent.js';
import CalendarView from './CalendarView.js';
import CalendarViewAgenda from './CalendarViewAgenda.js';


export default function MyEvents() {



  return (
    <View style={{flex:1}}>
      <CalendarView/>
      <CreateEvent />


    </View>
  )
}

