import { Text, View, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Location from 'expo-location';

import { globalStyles } from '../../styles/globalStyles';


export default function FiltersComp({eventsurl, setEventsToShow, tags}) {

  const [location, setLocation] = useState(null)
  const lang = ["", "en", "fi", "sv"]
  const [filters, setFilters] = useState({
    tag: "",
    radius: "",
    language: ""
  })

  useFocusEffect (()=> {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status!== 'granted') {
        Alert.alert('No permission to get location')
        return
      }
      let loc = await Location.getCurrentPositionAsync({})
    
      setLocation({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      })

    })()
  })

  const findByFilters =() => {
    let filtersurl=eventsurl 

    if (Object.values(filters).filter(item=>item==="").length<3) {
      filtersurl +='?'
    }
    
    if (filters.tag) {
      filtersurl += `tags_search=${filters.tag}&`
    }

    if (filters.radius) {
      filtersurl += `distance_filter=${location.lat}%2C ${location.lon}%2C ${filters.radius}&`
    }

    if (filters.language) {
      filtersurl +=`language_filter=${filters.language}&`
    }

    fetch(filtersurl)
    .then(response => response.json())
    .then(data => setEventsToShow(data.data))
    .catch(err=> Alert.alert('Error', "Something went wrong"))
  }

  const updateFilterTag = (tagvalue) => {
    setFilters({...filters, tag: tagvalue})
  }
  const updateFilterRadius = (radiusvalue) => {
    setFilters({...filters, radius: radiusvalue})
  }
  const updateFilterLang = (langvalue) => {
    setFilters({...filters, language: langvalue})
  }

  return (
    <View style={{flex:1}}>
      <Grid>
        <Col size={2}>
          <Row style={globalStyles.rowStyle}>
            <Text>Find by tag:</Text>
          </Row>
          <Row style={globalStyles.rowStyle}>
            <Text>Find nearby:</Text>
          </Row>
          <Row style={globalStyles.rowStyle}>
            <Text>Find by language:</Text>
          </Row>
        </Col>

        <Col size={3}>
          <Row style={globalStyles.rowStyle}>
            <Picker
              style={globalStyles.picker}
              selectedValue={filters.tag}
              mode="dropdown"
              onValueChange={updateFilterTag}>
              {["", ...Object.values(tags)].sort().map((tag) => {
                return (<Picker.Item label={tag} value={tag} key={tag} />)
              })}
            </Picker>
          </Row>
          <Row style={globalStyles.rowStyle}>
            <TextInput
              value={filters.radius}
              onChangeText={updateFilterRadius}
              keyboardType='numeric'
              style={globalStyles.textField}
            />
            <Text>(radius, km)</Text>
            
          </Row>
          <Row style={globalStyles.rowStyle}>
            <Picker
              style={globalStyles.picker}
              selectedValue={filters.language}
              mode="dropdown"
              onValueChange={updateFilterLang}>
              {lang.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index} />)
              })}
            </Picker>
          </Row>
        </Col>  

        <Col size={1}>
          <Row style={globalStyles.rowStyle}>
            <Button title="find" onPress = {findByFilters}/>
          </Row>
          <Row style={globalStyles.rowStyle}>
            <Button color="darkred" title="clear" onPress = {()=>setFilters({tag:'', radius: '', language: ''})}/>
          </Row>
        </Col>
      </Grid>
    </View>
  )
}