import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class ProfileScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        ...this.state,
      };
  }

  render() {
      return (
        <View>
          <Text>Profile Screen</Text>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          />
        </View>
      )
  }
}

export default ProfileScreen;