import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  rowStyle: {
    height: 50,
    alignItems: 'center'
  },
  textField: {
    width: 60, 
    borderColor: 'black', 
    borderWidth: 1, 
    margin: 5,
    backgroundColor: 'white'
  },
  picker: {
    width: 150,
    backgroundColor: 'white',
    height: 35 
  }

  
})