import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase , push, ref, onValue } from 'firebase/database';
import { initializeApp } from "firebase/app";
import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {firebaseApp} from '../../utils/firebaseconfig.js';
import firebaseSaveEvent from '../../utils/Functions/firebaseSaveEvent.js';

export default function CreateEventComponent() {

  const database = getDatabase(firebaseApp);

  const [duration, setDuration] = useState('')

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

  const saveEvent = () => {
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
  }
  
  return (
    <View>
      <Text>Create event</Text>
      <View style={styles.view_row}>
        <Text>Title: </Text>
        <TextInput 
          value = {event.title}
          onChangeText={(title) => setEvent({...event, title: title})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Description: </Text>
        <TextInput 
          value = {event.description}
          onChangeText={(description) => setEvent({...event, description: description})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Start: </Text>
        <TextInput 
          value = {event.start}
          onChangeText={(start) => setEvent({...event, start: start})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Duration (mins): </Text>
        <TextInput 
          value = {duration}
          onChangeText={(duration) => setDuration(duration)}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>Address: </Text>
        <TextInput 
          value = {event.address}
          onChangeText={(address) => setEvent({...event, address: address})}
          style = {{width: 200, borderColor: 'grey', borderWidth: 1}}
        />
      </View>
      <View style={styles.view_row}>
        <Text>URL: </Text>
        <TextInput 
          value = {event.url}
          onChangeText={(url) => setEvent({...event, url: url})}
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