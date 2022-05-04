import { StyleSheet, Text, View, FlatList, Linking, Button, Alert, TouchableOpacity , TextInput } from 'react-native';
import Reac,  {useState} from 'react'


export default function FlatListItem({item}) {

  const [activeItem, setActiveItem] = useState('')
  const [shouldShow, setShouldShow] = useState(false)

  const addSelected=(id)=> {
    
    
  }
  
  const openURL=(url) => {
    if (url) {
      Linking.openURL(url)
    } else {
      Alert.alert("No URL available")
    }  
  }
  
  const openLocation = (lat, lon) => {
    Linking.openURL(`https://maps.google.com/?q=${lat},${lon}`)
  }
  
  const parseDate =(start, end) => {
    let start_date=(new Date(start)).toString().slice(0,16)
    let end_date=(new Date(end)).toString().slice(0,16)
    let start_time=(new Date(start)).toString().slice(16,21)
    let end_time=(new Date(end)).toString().slice(16, 21)
    if (start_date=== end_date) {
      return (`${start_date}, ${start_time}-${end_time}`)
    } else{
      return (`${start_date} - ${end_date}, ${start_time}-${end_time}`)
    }
  }

  


  // const showhideitem =(id) => {
  //   if (activeItem && activeItem==id) {
  //     setActiveItem('')
  //   } else {
  //     setActiveItem(id)
  //   }    
  // }
  
  
  return (
  <TouchableOpacity onPress={()=>setShouldShow(!shouldShow)}>
    <View style={{width: '100%'}} >
      <View style={{flexDirection: 'row', alignItems: 'center', width: '120%'}}>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '70%'}}>
        <Text on style={{fontSize: 18, fontWeight: 'bold'}} >{item.name.fi}: {item.location.address.locality}</Text>
          {shouldShow ? 
          (
            <View>
              <Text>{item.description.intro}</Text>
              <Text>When: {parseDate(item.event_dates.starting_day, item.event_dates.ending_day)}</Text>
              <Text>Address: {item.location.address.street_address}, {item.location.address.locality}</Text>
              <TouchableOpacity onPress={()=>openLocation(item.location.lat, item.location.lon)}>
                <Text style={styles.link}>Open location in GoogleMaps</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openURL(item.info_url)}>
                <Text style={styles.link}>Go to the website</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        </View>
        
        <Button title="Add" onPress={addSelected(item.id)} style={{width: '30%'}}></Button>
      </View>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue'
  }
  
});
  