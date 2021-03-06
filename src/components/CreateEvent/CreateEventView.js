import { Text, View, TextInput, Button, Alert } from 'react-native';
import React, {useState} from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";

import firebaseSaveEvent from '../../utils/Functions/firebaseSaveEvent.js';
import DatePickerComponent from './DatePickerComponent.js';
import { globalStyles } from '../../styles/globalStyles.js';
import {ACCESS_KEY_MAPQUEST} from '@env'

export default function CreateEventView() {

  const [uievent, setUievent] = useState({
    title: "",
    description: "",
    start: "",
    address: "",
    duration: "",
    url: ""
  })
  const [location, setLocation] = useState({})

  const calculateEnd = (uievent) => {
    if (uievent.start && uievent.duration) { 
      let end = new Date((Date.parse(uievent.start)+ uievent.duration*60*1000)).toISOString()
      return end;
      } else {
        return null
      }
  }

  function getLocation(address) {
    const access_key_mapquest = 'IB180O9hQIKzNnLGzCxHGsQGeOUALLyt'

    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${access_key_mapquest}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "location": address })
    })
      .then(response => response.json())
      .then(data => {
        setLocation({
          lat: data['results'][0].locations[0].latLng.lat,
          lon: data['results'][0].locations[0].latLng.lng
        })
      }
      )
      .catch(err => console.error(err))
    return location
  }

  const transformEvent = () => {
    let loc = {
      lat: null,
      lon: null
    }
    if (uievent.address) {
      let coordinates =  getLocation(uievent.address)
      loc.lat=coordinates.lat
      loc.lon=coordinates.lon
    }
   
    return ({
      id: Date.now(),
      title: uievent.title,
      description: uievent.description,
      start: uievent.start,
      end: calculateEnd(uievent),
      location: { lat: loc.lat, lon: loc.lon },
      address: uievent.address,
      url: uievent.url
    })
  }

  const saveEvent =  () => {
    let event = transformEvent(uievent)
    if (!event.title) {
      Alert.alert(`Title can't be empty!`)
    } else {
      firebaseSaveEvent(event)
      Alert.alert(`Event ${event.title} created`)
    }

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
        
    <View style={{flex:1}}>
      <Text style={globalStyles.header}>Create event</Text>
      <Grid>
        <Col size={2} >
          <Row style={globalStyles.rowStyle}><Text>Title: </Text></Row>
          <Row style={globalStyles.rowStyle}><Text>Description: </Text></Row>
          <Row style={globalStyles.rowStyle}><Text>Start: </Text></Row>
          <Row style={globalStyles.rowStyle}><Text>Duration (mins): </Text></Row>
          <Row style={globalStyles.rowStyle}><Text>Address: </Text></Row>
          <Row style={globalStyles.rowStyle}><Text>URL: </Text></Row>    
        </Col>
        <Col size={4}>
          <Row style={globalStyles.rowStyle}>
            <TextInput 
              value = {uievent.title}
              onChangeText={(title) => setUievent({...uievent, title: title})}
              style = {globalStyles.textFieldWide}
            />
          </Row>
          <Row style={globalStyles.rowStyle}>
            <TextInput 
              value = {uievent.description}
              onChangeText={(description) => setUievent({...uievent, description: description})}
              style = {globalStyles.textFieldWide}
            />
          </Row>
          <Row style={globalStyles.rowStyle}>
            <DatePickerComponent uievent = {uievent} setUievent = {setUievent} />
          </Row>
          <Row style={globalStyles.rowStyle}>
            <TextInput 
              value = {uievent.duration}
              keyboardType='numeric'
              onChangeText={(duration) => setUievent({...uievent, duration: duration})}
              style = {globalStyles.textFieldWide}
            />
          </Row>
          <Row style={globalStyles.rowStyle}>
            <TextInput 
              value = {uievent.address}
              onChangeText={(address) => setUievent({...uievent, address: address})}
              style = {globalStyles.textFieldWide}
            />
          </Row>
          <Row style={globalStyles.rowStyle}>           
            <TextInput 
              value = {uievent.url}
              onChangeText={(url) => setUievent({...uievent, url: url})}
              style = {globalStyles.textFieldWide}
            />
          </Row> 
        </Col>
      </Grid>
      <View style={globalStyles.buttonView}>
        <Button 
          title="Save event"
          onPress={saveEvent}
        />
      </View>
    </View>
  )
}
