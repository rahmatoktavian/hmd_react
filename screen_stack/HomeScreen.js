import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        ...this.state,
        nama: '',
        gender: '',
        anak: [],
      };
  }

  componentDidMount() {
    let nama = 'Rahmat';
    nama = 'Mamat';

    const gender = 'Pria';

    let anak = [
                {nama:'Jihan', umur:7},
                {nama:'Hamidah', umur:3},
              ];

    this.setState({nama:nama, gender:gender, anak:anak})
  }

  render() {
      return (
        <View>
          <Text>Home Screen</Text>
          <Button
            title="Go to Profile"
            onPress={() => this.props.navigation.navigate('ProfileScreen', {nama:this.state.nama, gender:this.state.gender, listAnak:this.state.anak})}
          />
        </View>
      )
  }
}

export default HomeScreen;