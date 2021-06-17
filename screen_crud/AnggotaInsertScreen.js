import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class AnggotaInsertScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        nim: '',
        nama: '',
        jurusan: '',
        isLoading: false,

        displayDateTimePicker: false,
        tanggal: new Date(),
      };
  }

  //memanggil api untuk menyimpan data
  onInsert() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/anggota';

      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            nim: this.state.nim,
            nama: this.state.nama,
            jurusan: this.state.jurusan,
          })
      };

      //memanggil server api
      fetch(apiurl, options)
      .then(response => {return response.json()})

      //response dari api
      .then(responseData => {
          this.setState({isLoading:false});

          //menampilkan response message
          Alert.alert(
            "Pemberitahuan",
            responseData.message,
            [
              { text: "OK", onPress: () => this.props.navigation.navigate('AnggotaListScreen') }
            ]
          );
      })
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Insert Anggota" />
          </Appbar.Header>

          <TextInput
            label="NIM"
            value={this.state.nim}
            onChangeText={text => this.setState({nim:text})}
            keyboardType="numeric"
            style={{margin:10}}
          />

          <TextInput
            label="Nama"
            value={this.state.nama}
            onChangeText={text => this.setState({nama:text})}
            style={{margin:10}}
          />

          <TextInput
            label="Jurusan"
            value={this.state.jurusan}
            onChangeText={text => this.setState({jurusan:text})}
            style={{margin:10}}
          />

          <Button 
              mode="contained" 
              icon="check" 
              onPress={() => this.onInsert()}
              style={{margin:10}}
          >
            Simpan
          </Button>

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>
        </PaperProvider>
      )
  }
}

export default AnggotaInsertScreen;