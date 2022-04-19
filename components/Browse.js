import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react'
import SearchResults from './SearchResults';
import {Picker} from '@react-native-picker/picker';

export default function Browse() {
  const eventsurl=`http://open-api.myhelsinki.fi/v1/events/`
  const tagsearchurl = `https://open-api.myhelsinki.fi/v1/events/?tags_search=${selectedTag}`

  const [events, setEvents] = useState([])
  const [rowVisible, setRowvisible] = useState(false) 
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  
  const fetchEvents = () => {
    fetch(eventsurl)
    .then(response => response.json())
    .then(data => {
      setEvents(data.data) 
      setTags(data.tags)
      
    },
    setRowvisible(true)
    )
    .catch(err=> 
      Alert.alert('Error', "Something went wrong")
      )
  }

  const findByTag =() => {
    // fetch(tagsearchurl)
    // .then(response => response.json())
    // .then data

  }


  return (
    <View style={{height: '100%'}}>
      <View style={{height: '30%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Picker
            style={{width: 150}}
            selectedValue={selectedTag}
            mode="dropdown"
            onValueChange={value => setSelectedTag(value) }>
            {Object.values(tags).map((tag)=> {
              return (<Picker.Item label={tag} value={tag} key={tag}/>)
            })}
          </Picker>
          <Button 
            title="find"
            onPress = {findByTag}
          />
        </View>
      </View>
      <SearchResults 
        data={events} 
        rowVisible={rowVisible}
        style= {{
        height: '50%'}}/>
      <Button 
        title="Find"
        onPress={fetchEvents}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
  