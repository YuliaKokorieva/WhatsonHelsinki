import {Linking, Alert } from 'react-native';
import firebaseSaveEvent from './firebaseSaveEvent'

const openURL = (url) => {
  if (url) {
    Linking.openURL(url)
  } else {
    Alert.alert("No URL available")
  }
}

const openLocation = (lat, lon) => {
  if (lat && lon) {
    Linking.openURL(`https://maps.google.com/?q=${lat},${lon}`)
  } else {
    Alert.alert("No address available")
  }
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

const addSelected = (item)=> {
  let eventToSave ={
    id: item.id,
    title: item.name.fi,
    description: item.description.intro,
    start: item.event_dates.starting_day,
    end: item.event_dates.ending_day,
    location: {lat: item.location.lat, lon: item.location.lon},
    address: `${item.location.address.street_address}, ${item.location.address.locality} `,
    url:item.info_url
  }
  firebaseSaveEvent(eventToSave)      
}

export {openURL, openLocation, parseDate, addSelected}

