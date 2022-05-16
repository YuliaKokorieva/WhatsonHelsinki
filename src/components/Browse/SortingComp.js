import { Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import { selectCurrentWeek } from '../../utils/Functions/sortingFuncs';

export default function SortingComp({eventsToShow, setEventsToShow}) {

  const showCurrentWeekEvents =() => {
    setEventsToShow(selectCurrentWeek(eventsToShow))
  }

  return(
    <View>
      <Card>
        <TouchableOpacity onPress ={showCurrentWeekEvents}>
          <Text>Events this week</Text>
        </TouchableOpacity>
      </Card>
    </View>
  )
}