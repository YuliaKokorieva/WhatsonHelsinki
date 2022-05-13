import { Text, View, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';


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
  
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '70%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Find by tag:     </Text>
              <Picker
                style={{width: 150}}
                selectedValue={filters.tag}
                mode="dropdown"
                onValueChange={updateFilterTag}>
                {Object.values(tags).sort().map((tag)=> {
                  return (<Picker.Item label={tag} value={tag} key={tag}/>)
                })}
              </Picker>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Find nearby: </Text>
              <TextInput
                value={filters.radius}
                onChangeText = {updateFilterRadius}
                keyboardType= 'numeric'
                style = {{width: 60, borderColor: 'grey', borderWidth: 1, marginBottom: 30}}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Find by language:     </Text>
              <Picker
                style={{width: 100}}
                selectedValue={filters.language}
                mode="dropdown"
                onValueChange={updateFilterLang}>
                {lang.map((item, index)=> {
                  return (<Picker.Item label={item} value={item} key={index}/>)
                })}
              </Picker>
            </View>

        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '30%'}}>
          <Button title="find" onPress = {findByFilters}/>
          <Button title="clear" onPress = {()=>setFilters({tag:'', radius: '', language: ''})}/>
        </View>
      </View>
      </View>
  )
}