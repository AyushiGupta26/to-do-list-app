import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import fire from '../fire';

var database = fire.database();

export default class ToDo extends React.Component{

  state = {
    tasks:[],
    keys:[]
  }

  componentDidMount(){
    database.ref('list').on('value', snapshot=>{
      let newTasks = []
      let newKeys =[]
      let data = snapshot.val();
      Object.keys(data).map(key => (
      newTasks = [...newTasks, data[key].task],
      newKeys = [...newKeys,key]
      ));
      this.setState({tasks: newTasks, keys: newKeys})
    });
  }
  
   componentWillUnmount(){
    database.ref('list').off();
  }

  _sendChanges(newText, i){
    database.ref('list/'+ this.state.keys[i] + '/task').set(newText);
  }

  _addTask(){
    let newTasks = [];
    newTasks = [...this.state.tasks, ""]
    this.setState({tasks: newTasks});
    var newPostRef = database.ref('list').push();
    database.ref('list/'+ newPostRef.key + '/task').set('')
    database.ref('list/'+ newPostRef.key + '/status').set('Pending')
    let newKeys = [];
    newKeys = [...this.state.keys,newPostRef.key]
    this.setState({keys: newKeys})
  }

  _statusChange(i){
    database.ref('list/' + this.state.keys[i] + '/status').set('Done')
  }

  _buttonTextUpdate(i){
    let data =''
      database.ref('list/' + this.state.keys[i] + '/status').on('value', snapshot=>{
      data = snapshot.val();
      })
      return data;
  }

  render(){
    return(
      <View style = {styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>this._addTask()}>
      <Text> Add task </Text>
      </TouchableOpacity>
      <ScrollView>
      {
      this.state.tasks.map( (item,i) =>{
            return (
            <View style={styles.items}>
              <TextInput
                style={styles.text}
                multiline = {true}
                placeholder={'Type here...'}
                value={item}
                onChangeText={newText=>this._sendChanges(newText,i)}
              />
              <TouchableOpacity onPress={()=>{this._statusChange(i)}}>
                 <Text style={{color:'blue'}}>{this._buttonTextUpdate(i)}</Text>
              </TouchableOpacity>
            </View>
            )
      })
      }
      </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  text:{
    flex: 2,
    height:40,
  },
  button:{
    backgroundColor: 'gray'
  },
  items: {
    flexDirection: 'row'
  }
})