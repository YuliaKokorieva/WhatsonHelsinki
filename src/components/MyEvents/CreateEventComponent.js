import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase , push, ref, onValue } from 'firebase/database';
import { initializeApp } from "firebase/app";
import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DatePicker from "react-datepicker";

import {firebaseApp} from '../../utils/firebaseconfig.js';
import firebaseSaveEvent from '../../utils/Functions/firebaseSaveEvent.js';
import DatePickerComponent from './DatePickerComponent.js';

export default function CreateEventComponent() {

  const database = getDatabase(firebaseApp);

  const [uievent, setUievent] = useState({
    title: "",
    description: "",
    start: "",
    address: "",
    duration: "",
    url: ""
  })

  const [event, setEvent] = useState({
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
    location: "",
    address: "",
    url: ""
  })
  const parseDuration = (start, duration) => {
    
  }

  const transformEvent = (uievent) => {
    setEvent({
      id: "",
      title: uievent.title,
      description: uievent.description,
      start: "",
      end: "",
      location: "",
      address: uievent.address,
      url: uievent.url
    })
    console.log(`event : ${event}`)
  }

  const saveEvent = () => {
    transformEvent(uievent)

    firebaseSaveEvent(event)
    setEvent({
      id: "",
      title: "",
      description: "",
      start: "",
      end: "",
      location: "",
      address: "",
      url: ""
    })
    setUievent({
      title: "",
      description: "",
      start: "",
      address: "",
      duration: "",
      url: ""
    })
  }
  
  return (
    <View>
      <Text>Create event</Text>
      <View style={styles.view_row}>
        <Text>Title: </Text>
        <TextInput 
          value = {uievent.title}
          onChangeText={(title) => setUievent({...uievent, title: title})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Description: </Text>
        <TextInput 
          value = {uievent.description}
          onChangeText={(description) => setUievent({...uievent, description: description})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Start: </Text>
        <DatePickerComponent uievent = {uievent} setUievent = {setUievent} />
      </View>
      <View style={styles.view_row}>
        <Text>Duration (mins): </Text>
        <TextInput 
          value = {uievent.duration}
          onChangeText={(duration) => setUievent({...uievent, start: duration})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Address: </Text>
        <TextInput 
          value = {uievent.address}
          onChangeText={(address) => setUievent({...uievent, address: address})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>URL: </Text>
        <TextInput 
          value = {uievent.url}
          onChangeText={(url) => setUievent({...uievent, url: url})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <Button 
        title="Save event"
        onPress={saveEvent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view_row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5, 
    marginBottom: 5
  }
})