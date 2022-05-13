import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Agenda} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import getEventsFromFirebaseFunc from '../../utils/Functions/firebaseGetAllEvents';

export default function AgendaComponent() {
  
  const [eventsToShow, setEventsToShow] = useState({})

  const [items, setItems] = useState({
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
  // const [items, setItems] = useState({})

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  useEffect(()=> {

    getData()
  },[])

  const getData = () => {
    let rawEvents = getEventsFromFirebaseFunc()
    console.log(rawEvents)
    const reducedEvents = rawEvents.reduce((acc, currentEvent) => {
      const {start, ...item} = currentEvent
      acc[start.split('T')[0]]=[item]
      return acc
    }, {},
    )
    setEventsToShow(reducedEvents)
    console.log(eventsToShow)
  }
  
  const renderItem = (item) => {

    return (
      <View >
        <TouchableOpacity>
          <Card>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              }}>
              <Text>{title.name}</Text>
            </View>
          </Card>
         </TouchableOpacity>

      </View>
    )

  }

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
 

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={ '2022-05-09'}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});