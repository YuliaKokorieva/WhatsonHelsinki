import { StyleSheet, Text, View, FlatList, Button,} from 'react-native';
import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import FlatListItemComp from './FlatListItemComp.js';
import { globalStyles } from '../../styles/globalStyles.js';

export default function SearchResultsComp({data}) {

  const [datatoshow, setDatatoshow] = useState(null)
    
  useFocusEffect(() => {
    setDatatoshow(data);
  });

  const listSeparator = () => {
    return (
      <View        
        style={globalStyles.listItemSeparator}
      />
    );
  };

  const renderItem =({item}) => (
    <FlatListItemComp item = {item}/>
  )

  return (
    <View style={globalStyles.container}>
      <FlatList 
        data={datatoshow}
        keyExtractor ={item => item.id}
        ItemSeparatorComponent ={listSeparator}
        renderItem={renderItem}
        initialNumToRender={15}
      />
    </View>
  );
}
  