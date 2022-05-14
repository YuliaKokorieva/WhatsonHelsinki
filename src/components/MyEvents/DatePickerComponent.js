import React, {useState} from 'react';
import {View, Button, Platform, Alert} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default DatePickerComponent =({uievent, setUievent}) => {
 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('empty')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setUievent({...uievent, start: currentDate.toISOString()})

    setText(`Date: ${currentDate.toISOString().slice(0,10)}, time: ${currentDate.toISOString().slice(11,16)}`)
    Alert.alert(text)
  }
  
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 5 }}>
          <Button title='DatePicker' onPress={() => showMode('date')} />
        </View>
        <View style={{ margin: 5 }}>
          <Button title='TimePicker' onPress={() => { showMode('time')}} />
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};
