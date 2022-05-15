import { View, Text } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';

import { globalStyles } from '../../styles/globalStyles.js';

export default function WelcomeComponent() {
  return (
    <View>
      <Card>
        <View style={globalStyles.welcomeCard}>
          <Text style={globalStyles.header}>Welcome to Whatson Helsinki!</Text>
          <Text style={globalStyles.textSmall}>(touch to hide){"\n"}</Text>
          <Text>Here you can:{"\n"}{"\n"}
            * browse the huge database of events in Helsinki,{"\n"}{"\n"}
            * create your own events and {"\n"}{"\n"}
            * save them and check in your calendar
          </Text>
        </View>
      </Card>

    </View>
  )
    
}