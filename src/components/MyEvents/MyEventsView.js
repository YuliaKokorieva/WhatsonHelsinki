import { View, TouchableOpacity, Button } from 'react-native';
import React , {useState} from 'react';

import AgendaComponent from './AgendaComponent.js';
import WelcomeComponent from './WelcomeComponent.js';
import { globalStyles } from '../../styles/globalStyles';

export default function MyEventsView() {
  const [viewWelcome, setViewWelcome] = useState(true)

  return (
    <View style={{flex:1}}>
      {viewWelcome
      ? <TouchableOpacity onPress ={()=>setViewWelcome(false)}>
          <WelcomeComponent />
        </TouchableOpacity>
      : <View style={globalStyles.buttonView}>
          <Button title = "Show Welcome greeting" onPress={()=> setViewWelcome(true)}/>

      </View>
      }
      <AgendaComponent/>
    </View>
  )
}

