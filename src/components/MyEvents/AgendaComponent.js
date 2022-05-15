import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Agenda} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import firebaseGetAllEvents from '../../utils/Functions/firebaseGetAllEvents';
import { globalStyles } from '../../styles/globalStyles';

export default function AgendaComponent() {
  

  const [eventsToShow, setEventsToShow] = useState({
    '2022-05-25': [{
      title: 'Puuhakeskiviikko', 
      description: 'Puuhakeskiviikko koululaisille', 
      start: '2022-05-25T11:00:00.000Z', 
      end: '', 
      url: '', 
      location: {
        lat: '', 
        lon: ''}}],
      
    '2022-05-26': [{
      title: 'Kardo Shiwan: FUR', 
      description: 'Onko karva evolutiivinen jäänne? Mikä on karvan tulevaisuus? Taiteilija Kardo Shiwanin mielestä karvan avulla voimme tutkia itseämme, historiaamme ja kulttuuriamme.', 
      start: '2022-05-26T16:00:00.000Z', 
      end: '', 
      url: 'http://www.caisa.fi/fi/tapahtumat/event/D954543528AD75937DC26D5DB1AA10D3/Kardo_Shiwan_FUR', 
      location: {
        lat: '60.21747970581055', 
        lon: '24.809919357299805'}}],
       })

  useEffect(()=> {
    console.log('getting data')
    getData()
  },[])

  const getData = () => {
    let rawEvents = Object.values(firebaseGetAllEvents())

    let events = {}
    for (let i=0; i<rawEvents.length; i++) {
      let strTime = rawEvents[i].start.split('T')[0]
      if (!events[strTime]) {
        events[strTime] = []
      }
      events[strTime].push(rawEvents[i])
    }
    setEventsToShow(events)
  }
  
  const renderItem = (item) => {
    return (
      <View >
        <TouchableOpacity>
          <Card>
            <View style={globalStyles.agendaCard}>
              <Text>{item.title}</Text>
            </View>
          </Card>
         </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={eventsToShow}
        renderItem={renderItem}
      />
    </View>
  );
}
