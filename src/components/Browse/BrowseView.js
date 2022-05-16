import {API_URL} from '@env'
import { Text, View, Button, Alert} from 'react-native';
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

  const handleShowSorting = () => {
    if (!filtersvisible && !sortingvisible) {
      setSortingvisible(true)
    }
    if (filtersvisible && !sortingvisible) {
      setFiltersvisible(false)
      setSortingvisible(true)
    }
    if (sortingvisible) {
      setSortingvisible(false)
    }

  }

  const handleShowFilters=() => {
    if (!filtersvisible && !sortingvisible) {
      setFiltersvisible(true)
    }
    if (!filtersvisible && sortingvisible) {
      setFiltersvisible(true)
      setSortingvisible(false)
    }
    if (filtersvisible) {
      setFiltersvisible(false)
    }
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
          {/* https://www.raywenderlich.com/718-6-best-practices-for-mobile-app-search-filtering */}
          {filtersvisible 
          ? <FiltersComp
              eventsurl={eventsurl}
              setEventsToShow={setEventsToShow}
              tags={tags}
            />
          : null
          }
          {sortingvisible
          ? <SortingComp
              eventsToShow = {eventsToShow}
              setEventsToShow={setEventsToShow}
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
