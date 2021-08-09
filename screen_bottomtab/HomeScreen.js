import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

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
          <Appbar.Header>
            <Appbar.Content title="Home" />
          </Appbar.Header>

        </View>
      )
  }
}

export default HomeScreen;
