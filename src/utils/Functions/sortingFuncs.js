
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
export {selectCurrentWeek}

 const searchFilterFunction = (text) => {
    if (text) {

      const newData = masterData.filter(function (item) {
        console.log(item.name)
        const itemData = item.name.fi
          ? item.name.fi.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setKeyword(text);
    } else {

      setFilteredData(data);
      console.log(filteredData)
      setKeyword(text);
    }
  };