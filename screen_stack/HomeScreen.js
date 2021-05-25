import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        ...this.state,
      };
  }

  render() {
      return (
        <View>
          <Text>Home Screen</Text>
          <Button
            title="Go to Profile"
            onPress={() => this.props.navigation.navigate('ProfileScreen')}
          />
        </View>
      )
  }
}

export default HomeScreen;