import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyEvents from './src/components/MyEvents';
import Browse from './src/components/Browse';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="My Events" component={MyEvents} />
          <Tab.Screen name="Browse" component={Browse} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
