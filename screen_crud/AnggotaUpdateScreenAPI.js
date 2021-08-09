import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class AnggotaUpdateScreenAPI extends Component {

  constructor(props) {
      super(props);

      this.state = {
        nim: '',
        nama: '',
        jurusan: '',
        isLoading: false,
      };
  }

  componentDidMount() {
      this.getData();
  }

  getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let nim = this.props.route.params.nim;
      let apiurl = BaseUrl()+'/anggota/detail/?nim='+nim;
      const options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      };

      //memanggil server api
      fetch(apiurl, options)
      .then(response => {return response.json()})

      //response dari api
      .then(responseData => { 
          //menangkap response api
          let data = responseData.data;
   
          //memasukan respon ke state untuk loop data di render
          this.setState({
              nim: data.nim,
              nama: data.nama,
              jurusan: data.jurusan, 
              isLoading:false
            });
      })
  }

  //memanggil api untuk menyimpan data
  onUpdate() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/anggota';

      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            nim: this.props.route.params.nim,
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

  onDeleteConfirm() {
    Alert.alert(
      "Perhatian",
      "Data akan dihapus",
      [ 
        { text: "Batal" },
        { text: "OK", onPress: () => this.onDelete() }
      ]
    );
  }

  onDelete() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/anggota/delete/?nim='+this.props.route.params.nim;
      
      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
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
            <Appbar.Content title="Update Anggota" />
            <Appbar.Action icon="delete" onPress={() => this.onDeleteConfirm()} />
          </Appbar.Header>

          <TextInput
            label="NIM"
            value={this.state.nim}
            onChangeText={text => this.setState({nim:text})}
            keyboardType="numeric"
            disabled={true}
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
              onPress={() => this.onUpdate()}
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

export default AnggotaUpdateScreenAPI;