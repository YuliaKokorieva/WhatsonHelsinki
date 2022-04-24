import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
// import {database} from '../utils/firebaseconfig.js'
import { getDatabase , push, ref, onValue } from 'firebase/database';
import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA5ad2mTPWg-AlIe1TW3N3TzFguiVrZGak",
  authDomain: "helsinkievents-29262.firebaseapp.com",
  databaseURL: "https://helsinkievents-29262-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "helsinkievents-29262",
  storageBucket: "helsinkievents-29262.appspot.com",
  messagingSenderId: "1052815759476",
  appId: "1:1052815759476:web:4fceb862855dbb766e1921"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function MyEvents() {

  const [event, setEvent] = useState({
    title: "",
    description: "",
    start: "",
    duration: "",
    address: "",
    url: ""
  })
  const [events, setEvents] = useState([])

  useEffect(()=> {
    const eventsRef = ref(database, 'HelsinkiEvents/')
    onValue(eventsRef, (snapshot)=> {
      if (snapshot) {
        setEvents(Object.values(snapshot.val()))
      }
    })
  }, [])

  const saveEvent = () => {
    push(
      ref(database, 'HelsinkiEvents/'),
        {
          "title": event.title,
          "description": event.description,
          "start": event.start,
          "duration": event.duration,
          "address": event.address,
          "url": event.url
        }
      )
    setEvent({
      title: "",
      description: "",
      start: "",
      duration: "",
      address: "",
      url: ""
    })
  }

  return (
    <View>
      <Text>My events</Text>
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
          value = {event.duration}
          onChangeText={(duration) => setEvent({...event, duration: duration})}
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