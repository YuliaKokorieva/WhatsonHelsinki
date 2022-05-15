import React, {useState} from 'react';
import {View, Button, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { globalStyles } from '../../styles/globalStyles';

export default DatePickerComponent =({uievent, setUievent}) => {
 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('empty')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setUievent({...uievent, start: currentDate.toISOString()})

    setText(`Date: ${currentDate.toISOString().slice(0,10)}, time: ${currentDate.toLocaleTimeString().slice(0,6)}`)
  }
  
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={globalStyles.buttonView}>
          <Button title='DatePicker' onPress={() => showMode('date')} />
        </View>
        <View style={globalStyles.buttonView}>
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
