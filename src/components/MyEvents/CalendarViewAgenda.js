import React, {useState, Fragment, useCallback, useMemo} from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import {Agenda} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';





export default function CalendarViewAgenda() {
  const [items, setItems] = useState({
    '2022-05-07': [{name: 'item 1 - any js object'}],
    '2022-05-08': [{name: 'item 2 - any js object', height: 80}],
    '2022-05-09': [],
    '2022-05-10': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    })
  // const [items, setItems] = useState({})

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderItem = (item) => {

    return (
      <View >
        <TouchableOpacity>
          <Card>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
            </View>
          </Card>
         </TouchableOpacity>

      </View>
    )

  }

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
 

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={ '2022-05-09'}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});