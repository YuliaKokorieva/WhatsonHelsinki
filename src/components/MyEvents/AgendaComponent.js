import React, {useState, useEffect} from 'react';
import { Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import {Agenda} from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-elements';

import firebaseGetAllEvents from '../../utils/Functions/firebaseGetAllEvents';
import { globalStyles } from '../../styles/globalStyles';
import { parseDate, openLocation, openURL } from '../../utils/Functions/helpersFunctions.js'

export default function AgendaComponent() {
  
  const [cardOpen, setCardOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  //sample data in case fetching doesn't work
  let events = {
    '2022-05-25': [{
      title: 'Puuhakeskiviikko', 
      description: 'Puuhakeskiviikko koululaisille', 
      start: '2022-05-25T11:00:00.000Z', 
      end: '2022-05-25T13:00:00.000Z', 
      url: '', 
      location: {
        lat: '', 
        lon: ''}}],
      
    '2022-05-26': [{
      title: 'Kardo Shiwan: FUR', 
      description: 'Onko karva evolutiivinen jäänne? Mikä on karvan tulevaisuus? Taiteilija Kardo Shiwanin mielestä karvan avulla voimme tutkia itseämme, historiaamme ja kulttuuriamme.', 
      start: '2022-05-26T16:00:00.000Z', 
      end: '2022-05-26T18:00:00.000Z', 
      url: 'http://www.caisa.fi/fi/tapahtumat/event/D954543528AD75937DC26D5DB1AA10D3/Kardo_Shiwan_FUR', 
      location: {
        lat: '60.21747970581055', 
        lon: '24.809919357299805'}}],
       }
      //  )

  useEffect(()=> {
    console.log('getting data')
    getData()
  },[])

  const getData = () => {
    let rawEvents = Object.values(firebaseGetAllEvents())
    for (let i=0; i<rawEvents.length; i++) {
      let strTime = rawEvents[i].start.split('T')[0]
      if (!events[strTime]) {
        events[strTime] = []
      }
      events[strTime].push(rawEvents[i])
    }
  }

  const renderItem = (item) => {
    return (
      <View >
        <TouchableOpacity onPress={()=> {setCardOpen(true), setModalData(item)}}>
          <Card>
            <View style={globalStyles.agendaCard}>
              <Text>{item.title} {"\n"}{parseDate(item.start, item.end)}</Text>
            </View>
          </Card>
          <Modal visible={cardOpen}>
            <View style={globalStyles.modal}>
              <Text style={globalStyles.header}>{modalData.title}{"\n"}</Text>
              <Text>{modalData.description} {"\n"}{"\n"}When: {parseDate(modalData.start, modalData.end)}{"\n"}</Text>
              <TouchableOpacity onPress={()=>openLocation(modalData.location.lat, modalData.location.lon)}>
                <Text style={globalStyles.link}>Open location in GoogleMaps</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openURL(modalData.url)}>
                <Text style={globalStyles.link}>Go to the website{"\n"}</Text>
              </TouchableOpacity>
              <View style={globalStyles.buttonView}>
                <Button title="Close" onPress={()=>setCardOpen(false)}/>
              </View>
            </View>
          </Modal>
         </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Card>
        <Text style={globalStyles.header}>My agenda</Text>
      </Card>
      <Agenda
        items={events}
        renderItem={renderItem}
      />
    </View>
  );
}
