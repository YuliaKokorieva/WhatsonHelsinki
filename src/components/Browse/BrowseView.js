import {API_URL} from '@env'
import { View, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react'

import SearchResultsComp from './SearchResultsComp';
import FiltersComp from './FiltersComp';
import SortingComp from './SortingComp';
import { globalStyles } from '../../styles/globalStyles';

export default function BrowseView() {

  const [allevents, setAllevents] = useState([])  
  const [eventsToShow, setEventsToShow] =  useState([])
  const [tags, setTags] = useState([])
  
  const [sortButtonVisible, setSortButtonvisible] = useState(false) 
  const [filtersvisible, setFiltersvisible] = useState(false)
  const [sortingvisible, setSortingvisible] = useState(false)


  const eventsurl='http://open-api.myhelsinki.fi/v1/events/'
   
  useEffect(()=> firstFetchData(), [])

  const firstFetchData = () => {
    fetch(eventsurl)
    .then(response => response.json())
    .then(data => {
      setAllevents(data.data) 
      setTags(data.tags)
    },
    setSortButtonvisible(true)
    )
    .catch(err=> Alert.alert('Error', "Data could not be fetched") )    
  }

  return (
    <View style={{flex:1}}>
      <View >
        <View style={globalStyles.buttonView}>
          <Button 
            title="Show all"
            onPress={()=>setEventsToShow(allevents)}
          />
          <Button
            title ="filters"
            onPress={()=>setFiltersvisible(!filtersvisible)}
          />
          {sortButtonVisible
          ? 
          <Button 
            title="sort selected "
            onPress={()=>setSortingvisible(!sortingvisible)}
          />
          : null
          }
        </View>
          
        <View>
          {filtersvisible 
          ? 
            <FiltersComp
              eventsurl={eventsurl}
              setEventsToShow={setEventsToShow}
              tags={tags}
              allevents={allevents}
            />
          : null
          }
          {sortingvisible
          ? 
            <SortingComp
              eventsToShow={eventsToShow}
              setEventsToShow={setEventsToShow}
              allevents={allevents}
            />
          :null
        }
        </View>
      </View>
      <View style={{flex:1}}>
        <SearchResultsComp 
          data={eventsToShow} 
        />
      </View>
    </View>
  );
}
