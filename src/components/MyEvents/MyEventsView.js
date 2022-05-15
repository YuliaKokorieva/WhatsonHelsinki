import { View } from 'react-native';
import React from 'react';
import CreateEventComponent from './CreateEventComponent.js';
// import CalendarComponent from './CalendarCalendarComponent.js';
import AgendaComponent from './AgendaComponent.js';


export default function MyEventsView() {

  return (
    <View style={{flex:1}}>
      <AgendaComponent/>
      <CreateEventComponent />


    </View>
  )
}

