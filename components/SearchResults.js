import { StyleSheet, Text, View, FlatList, Linking, Button, Alert, TouchableOpacity , TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, {useState} from 'react'

export default function SearchResults({data}) {

  const [activeItem, setActiveItem] = useState('')
  const [keyword, setKeyword] = useState('')
  const [masterData, setMasterData] = useState([data])
  const [filteredData, setFilteredData] = useState([data])

  const addSelected=(id)=> {
    
  }

  const openURL=(url) => {
    if (url) {
      Linking.openURL(url)
    } else {
      Alert.alert("No URL available")
    }  
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
      <TouchableOpacity onPress={()=>setActiveItem(item.id)}>
        <View style={{width: '100%'}} >
          <View style={{flexDirection: 'row', alignItems: 'center', width: '120%'}}>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10, marginTop:10, width: '70%'}}>
              <Text on style={{fontSize: 18, fontWeight: 'bold'}} >{item.name.fi}</Text>
              {activeItem===item.id &&
              (
              <View>
                <Text>{item.description.intro}</Text>
                <TouchableOpacity onPress={()=>openURL(item.info_url)}>
                  <Text style={styles.link}>Go to the website</Text>
                </TouchableOpacity>
              </View>
              )}
            </View>
          
            <Button title="Add" onPress={addSelected(item.id)} style={{width: '30%'}}></Button>
          </View>
  
        </View>
      </TouchableOpacity>
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
        {/* <SearchBar
          lightTheme
          searchIcon={{ size: 20 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={keyword}
        /> */}

      <FlatList 
        data={data}
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
  