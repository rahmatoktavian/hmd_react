import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class ProfileScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        ...this.state,
        nama: this.props.route.params.nama,
        gender: this.props.route.params.gender,
      };
  }

  componentDidMount() {
    let listAnak = this.props.route.params.listAnak;
    this.setState({listAnak:listAnak});
  }

  render() {
      return (
        <View>
          <Text>Nama : {this.state.nama}</Text>
          <Text>Gender : {this.state.gender}</Text>

          {/*loop data state*/}
          {this.state.listAnak && this.state.listAnak.map((row,key) => (
            <Text key={key}>{row.nama}</Text>
          ))}
          {/*end loop*/}

          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          />
        </View>
      )
  }
}

export default ProfileScreen;