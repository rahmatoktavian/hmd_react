import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button, List, Text } from 'react-native-paper';

class ProfileScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        counter: 1
      };
  }

  onCounter() {
    let counter = this.state.counter;
    let new_counter = counter + 1;

    this.setState({counter:new_counter})
  }

  render() {
      return (
        <View>
          <Appbar.Header>
            <Appbar.Content title="Profile" />
          </Appbar.Header>

          <List.Section>
            <List.Item
                title="First User"
                description="Item description"
                left={props => <List.Icon {...props} icon="account" />}
                right={props => <List.Icon {...props} icon="pencil" />}
                onPress={() => this.props.navigation.navigate('ProfileDetailScreen', {title:'First User'})}
              />

              <List.Item
                title="Second User"
                description="Item description"
                left={props => <List.Icon {...props} icon="account" />}
                right={props => <List.Icon {...props} icon="pencil" />}
                onPress={() => this.props.navigation.navigate('ProfileDetailScreen', {title:'Second User'})}
              />
              <List.Item
                title="Third User"
                description="Item description"
                left={props => <List.Icon {...props} icon="account" />}
                right={props => <List.Icon {...props} icon="pencil" />}
                onPress={() => this.props.navigation.navigate('ProfileDetailScreen', {title:'Third User'})}
              />
          </List.Section>
          
          <Button 
              mode="contained" 
              icon="plus" 
              onPress={() => this.props.navigation.navigate('ProfileDetailScreen', {title:'Add New'})}
              style={{margin:20}}
          >
            Add New User
          </Button>

          <Button 
              mode="contained" 
              onPress={() => this.onCounter()}
              style={{margin:20}}
          >
            Counter Increment
          </Button>

          <Text style={{marginHorizontal:20}}>Counter Position: {this.state.counter}</Text>

        </View>
      )
  }
}

export default ProfileScreen;