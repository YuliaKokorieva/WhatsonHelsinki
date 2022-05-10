import { View } from 'react-native';
import React from 'react';
import CreateEvent from './CreateEvent.js';
// import CalendarView from './CalendarView.js';
import CalendarViewAgenda from './CalendarViewAgenda.js';


export default function MyEvents() {



  return (
    <View style={{flex:1}}>
      {/* <CalendarViewAgenda/> */}
      <CreateEvent />


    </View>
  )
}

