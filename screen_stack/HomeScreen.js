import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {

  constructor(props) {
      super(props);

      //default state
      this.state = {
        nama: '',
        gender: '',
        anak: [],
      };
  }

  //komponen yg pertama di load
  componentDidMount() {

    //let : variable bisa diubah
    let nama = 'Rahmat';
    nama = 'Mamat';

    //const : constanta yg ga bisa diubah
    const gender = 'Pria';

    //format array
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
          <Text>{this.state.nama}</Text>
          <Button
            title="Go to Profile"
            onPress={() => this.props.navigation.navigate('ProfileScreen', {nama:this.state.nama, gender:this.state.gender, listAnak:this.state.anak})}
          />
        </View>
      )
  }
}

export default HomeScreen;