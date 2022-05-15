import { Text, View, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react'

import SearchResultsComp from './SearchResultsComp';
import FiltersComp from './FiltersComp';
import { globalStyles } from '../../styles/globalStyles';
import {API_URL} from '@env'

export default function BrowseView() {

  const [allevents, setAllevents] = useState([])  
  const [eventsToShow, setEventsToShow] =  useState([])
  const [tags, setTags] = useState([])
  
  const [rowVisible, setRowvisible] = useState(false) 
  const [filtersvisible, setFiltersvisible] = useState(false)


  const eventsurl='http://open-api.myhelsinki.fi/v1/events/'
    
  useEffect(()=> firstFetchData(), [])

  const firstFetchData = () => {
    fetch(eventsurl)
    .then(response => response.json())
    .then(data => {
      setAllevents(data.data) 
      setTags(data.tags)
    },
    // setRowvisible(true)
    )
    .catch(err=> Alert.alert('Error', "Something went wrong, data could not be fetched") )    
  }

  const showAll =() => {
    setEventsToShow(allevents)
  }

  return (
    <View style={{height: "100%"}}>
    <View  style={{height: "30%"}}>
      <View style={globalStyles.buttonView}>
        <Button 
          title="Show all"
          onPress={showAll}
        />
        <Button
          title ="filters"
          onPress={()=>setFiltersvisible(!filtersvisible)}
        />
      </View>
      <View>
        {/* https://www.raywenderlich.com/718-6-best-practices-for-mobile-app-search-filtering */}
        {filtersvisible &&
            <FiltersComp
              eventsurl={eventsurl}
              setEventsToShow={setEventsToShow}
              tags={tags}
            />
        }
      </View>
    </View>
    <View style={{flex:1}}>
      <SearchResultsComp 
        data={eventsToShow} 
        rowVisible={rowVisible}

      />
    </View>
  </View>
  );
}
