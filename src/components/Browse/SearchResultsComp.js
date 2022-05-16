import { StyleSheet, Text, View, FlatList, Button,} from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, {useState} from 'react'
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native'
import FlatListItemComp from './FlatListItemComp.js';
import { globalStyles } from '../../styles/globalStyles.js';

export default function SearchResultsComp({data}) {

  const [activeItem, setActiveItem] = useState('')
  const [keyword, setKeyword] = useState('')
  const [datatoshow, setDatatoshow] = useState(null)
  const [masterData, setMasterData] = useState(data)
  const [filteredData, setFilteredData] = useState(data)
  
  const [sortby, setSortby] = useState('')
  const [sortbylist, setSortbylist] = useState(['title', 'date' ])
  
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
    <View style={styles.container}>
      {/* {rowVisible && 
      (
        <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
          <SearchBar
            lightTheme
            searchIcon={{ size: 20 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Type Here..."
            value={keyword}
          />
          <Text> sort by: </Text>
          <Picker
            style={{width: 100}}
            selectedValue={sortby}
            mode="dropdown"
            onValueChange={value => setSortby(value) }>
            {sortbylist.map((el)=> {
              return (<Picker.Item label={el} value={el} key={el}/>)
            })}
          </Picker>
          <Button title="sort" onPress={sortlist} style={{width: '30%'}}></Button>
        </View>
      )} */}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue'
  }
  
});
  