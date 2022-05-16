
const selectCurrentWeek = (eventsArray) => {
  const today = new Date()
  const daysNum = 7-today.getDay()
  
  const sunday = new Date(today.getTime() + daysNum*24*60*60*1000).toISOString()
  const sundayMidnight = sunday.substring(0,11) + "23:59" + sunday.substring(16)

  const selectedEvents = eventsArray.filter(function(item) {
    if (item.event_dates.starting_day) {
      return new Date(item.event_dates.starting_day).getTime()<new Date(sundayMidnight).getTime()
    } else {
      return false
    }
  })
  return selectedEvents
}


const keywordSearch = (eventsArray, keyword) => {
  if (keyword) {
    const filteredEvents = eventsArray.filter(function(item) {
      return item.name.fi.toLowerCase().includes(keyword.toLowerCase())
    })
    return filteredEvents
  } else {
    return eventsArray
  }
};

export {selectCurrentWeek, keywordSearch}