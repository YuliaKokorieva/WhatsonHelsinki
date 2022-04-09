import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react'
import SearchResults from './SearchResults';

export default function Browse() {
  const url=`http://open-api.myhelsinki.fi/v1/events/`

  const [events, setEvents] = useState([])
  
  const fetchEvents = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setEvents(data.data)      
    })
    .catch(err=> 
      Alert.alert('Error', "Something went wrong")
      )
  }

  return (
    <View style={{height: '100%'}}>
      <Text style={{height: '30%'}}>search filters</Text>
      <SearchResults 
      data={events} 
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
  