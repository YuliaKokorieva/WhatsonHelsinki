import React, {useState} from 'react';
import { NavigationContainer } from'@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyEventsView from './src/components/MyEvents/MyEventsView.js';
import BrowseView from './src/components/Browse/BrowseView.js';
import CreateEventView from './src/components/CreateEvent/CreateEventView.js';


const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="My Events" component={MyEventsView} />
          <Tab.Screen name="Browse" component={BrowseView} />
          <Tab.Screen name="Create Event" component={CreateEventView} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
