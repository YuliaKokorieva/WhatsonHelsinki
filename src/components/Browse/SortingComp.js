import { Text, TextInput, View, Button, Alert} from 'react-native';
import { Card } from 'react-native-elements';
import React, {useState} from 'react'

import { globalStyles } from '../../styles/globalStyles';
import { selectCurrentWeek, keywordSearch } from '../../utils/Functions/sortingFuncs';

export default function SortingComp({eventsToShow, setEventsToShow, allevents}) {
  const [keyword, setKeyword] = useState('')

  const showCurrentWeekEvents =() => {
    setEventsToShow(selectCurrentWeek(eventsToShow))
  }

  const searchByKeyword =() => {
    setEventsToShow(keywordSearch(eventsToShow, keyword))
  }

  const cancelSelection = () => {
    setEventsToShow(allevents)
    Alert.alert("Back to all events")
  }

  return (
    <View>
      <Card>
        <View style={globalStyles.lineContainerLeft}>
          <Text>Events this week      </Text>
          <View style={globalStyles.buttonView}>
            <Button
              title="show"
              onPress={showCurrentWeekEvents}
            />
          </View>
        </View>

        <View style={globalStyles.lineContainerLeft}>
          <Text>Search by keyword: </Text>
          <TextInput
            value={keyword}
            onChangeText={(keyword) => setKeyword(keyword)}
            style={globalStyles.textField100}
          />
          <View style={globalStyles.buttonView}>
            <Button title="show" onPress={searchByKeyword} />
          </View>
        </View>
        <View style={globalStyles.buttonView}>
            <Button title="cancel selection" onPress={cancelSelection} color="darkred" />
          </View>

      </Card>
    </View>
  )
}