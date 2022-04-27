import { StyleSheet, Text, View, FlatList, Linking, Button, Alert, TouchableOpacity , TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, {useEffect, useState} from 'react'
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native'
import FlatListItem from './FlatListItem';

export default function SearchResults({data, rowVisible}) {

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



  const sortlist = () => {
    console.log(data.length)

    // if (sortby =="title") {
    //   setDatatoshow(
    //     data.sort((a,b) => {
    //     return a.name -b.name
    //   }))
    // } else {

    // }
  }
  
  const listSeparator = () => {
    return (
      <View        
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"}}
      />
    );
  };


  const renderItem =({item}) => (
    <FlatListItem item = {item}/>
    // <TouchableOpacity onPress={()=>showhideitem(item.id)}>
    //   <View style={{width: '100%'}} >
    //     <View style={{flexDirection: 'row', alignItems: 'center', width: '120%'}}>
    //       <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '70%'}}>
    //         <Text on style={{fontSize: 18, fontWeight: 'bold'}} >{item.name.fi}: {item.location.address.locality}</Text>
    //         {activeItem===item.id &&
    //         (
    //         <View>
    //           <Text>{item.description.intro}</Text>
    //           <Text>When: {parseDate(item.event_dates.starting_day, item.event_dates.ending_day)}</Text>
    //           <Text>Address: {item.location.address.street_address}, {item.location.address.locality}</Text>
    //           <TouchableOpacity onPress={()=>openLocation(item.location.lat, item.location.lon)}>
    //             <Text style={styles.link}>Open location in GoogleMaps</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity onPress={()=>openURL(item.info_url)}>
    //             <Text style={styles.link}>Go to the website</Text>
    //           </TouchableOpacity>
    //         </View>
    //         )}
    //       </View>
        
    //       <Button title="Add" onPress={addSelected(item.id)} style={{width: '30%'}}></Button>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  )

  // const searchFilterFunction = (text) => {
  //   if (text) {

  //     const newData = masterData.filter(function (item) {
  //       console.log(item.name)
  //       // const itemData = item.name.fi
  //       //   ? item.name.fi.toUpperCase()
  //       //   : ''.toUpperCase();
  //       // const textData = text.toUpperCase();
  //       // return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredData(newData);
  //     setKeyword(text);
  //   } else {

  //     setFilteredData(data);
  //     console.log(filteredData)
  //     setKeyword(text);
  //   }
  // };

  return (
    <View style={styles.container}>
      {rowVisible && 
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
      )}

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
  