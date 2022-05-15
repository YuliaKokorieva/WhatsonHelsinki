import {Text, View, Button, TouchableOpacity } from 'react-native';
import React,  {useState} from 'react'

import {openURL, openLocation, parseDate, addSelected} from '../../utils/Functions/helpersFunctions';
import { globalStyles } from '../../styles/globalStyles';

export default function FlatListItemComp({item}) {

  const [shouldShow, setShouldShow] = useState(false)
 
  return (
    <TouchableOpacity onPress={()=>setShouldShow(!shouldShow)}>
      <View style={{width: '100%'}} >
        <View style={{flexDirection: 'row', alignItems: 'center', width: '120%'}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '70%'}}>
          <Text style={{fontSize: 18}} >{item.name.fi}: {item.location.address.locality}</Text>
            {shouldShow ? 
            (
              <View>
                <Text>{item.description.intro}</Text>
                <Text>When: {parseDate(item.event_dates.starting_day, item.event_dates.ending_day)}</Text>
                <Text>Address: {item.location.address.street_address}, {item.location.address.locality}</Text>
                <TouchableOpacity onPress={()=>openLocation(item.location.lat, item.location.lon)}>
                  <Text style={globalStyles.link}>Open location in GoogleMaps</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openURL(item.info_url)}>
                  <Text style={globalStyles.link}>Go to the website</Text>
                </TouchableOpacity>
              </View>
            ) : null
            }
          </View>
          <Button title="Add" onPress={()=>addSelected(item)} style={{width: '30%'}}></Button>
        </View>
      </View>
    </TouchableOpacity>
  )
}
