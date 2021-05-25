import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

class BukuUpdateScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
      };
  }

  render() {
      return (
        <View>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Update Buku" />
          </Appbar.Header>

        </View>
      )
  }
}

export default BukuUpdateScreen;