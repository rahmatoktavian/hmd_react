import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

class ProfileDetailScreen extends Component {

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
            <Appbar.Content title={this.props.route.params.title} />
          </Appbar.Header>

        </View>
      )
  }
}

export default ProfileDetailScreen;