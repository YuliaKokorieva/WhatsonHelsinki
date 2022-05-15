import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  rowStyle: {
    height: 48,
    alignItems: 'center',
    marginHorizontal: 5
  },
  textField: {
    width: 60, 
    borderColor: 'black', 
    borderWidth: 1, 
    margin: 5,
    backgroundColor: 'white'
  },
  textFieldWide: {
    width: 200, 
    borderColor: 'black', 
    borderWidth: 1, 
    margin: 5,
    backgroundColor: 'white'
  },
  picker: {
    width: 150,
    backgroundColor: 'white',
    height: 35 
  },
  header: {
    fontSize: 20
  },
  listItemSeparator: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
    marginLeft: "10%"
  },
  agendaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  



  
})