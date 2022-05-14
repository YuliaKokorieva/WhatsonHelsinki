import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';

import firebaseSaveEvent from '../../utils/Functions/firebaseSaveEvent.js';
import DatePickerComponent from './DatePickerComponent.js';

export default function CreateEventComponent() {

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

  const calculateEnd = (uievent) => {
    let end = new Date((Date.parse(uievent.start)+ uievent.duration*60*1000)).toISOString()
    return end;
  }

  const transformEvent = (uievent) => {
    setEvent({
      id: "",
      title: uievent.title,
      description: uievent.description,
      start: uievent.start,
      end: calculateEnd(uievent),
      location: "",
      address: uievent.address,
      url: uievent.url
    })
  }

  const saveEvent =  () => {
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
          keyboardType='numeric'
          onChangeText={(duration) => setUievent({...uievent, duration: duration})}
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