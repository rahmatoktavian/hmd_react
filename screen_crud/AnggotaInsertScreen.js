import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';

import supabase from '../config/supabase';
import Theme from '../config/Theme';

class AnggotaInsertScreen extends ValidationComponent {

  constructor(props) {
      super(props);

      this.state = {
        nim: '',
        nama: '',
        jurusan: '',
        isLoading: false,
      };
  }

  //memanggil api untuk menyimpan data
  async onInsert() {
    this.validate({
      nim: {required:true, numbers:true},
      nama: {required:true},
      jurusan: {required:true},
    });

    if(this.isFormValid()) {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('anggota')
        .insert({
                  nim: this.state.nim,
                  nama: this.state.nama,
                  jurusan: this.state.jurusan,
                });

      //menampilkan response
      let message = 'Data berhasil ditambah';
      if(error) {
        message = error.message;
      } 

      Alert.alert(
        "Pemberitahuan",
        message,
        [
          { text: "OK", onPress: () => this.props.navigation.navigate('AnggotaListScreen') }
        ]
      );

      this.setState({isLoading:false});

    } else {
      alert(this.getErrorMessages());
    }
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