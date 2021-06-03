import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';

import supabase from '../config/supabase';
import Theme from '../config/Theme';

class AnggotaUpdateScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        nim: this.props.route.params.nim,
        nama: '',
        jurusan: '',
        isLoading: false,
      };
  }

  componentDidMount() {
      this.getData();
  }

  async getData() {
      this.setState({isLoading:true});

      //memanggil api supabase (get data anggota by nim)
      let { data, error } = await supabase
        .from('anggota')
        .select('nama, jurusan')
        .eq('nim', this.state.nim)
        .single()

      //memasukan respon ke state untuk data di render
      this.setState({
        nama: data.nama,
        jurusan: data.jurusan, 
        isLoading:false
      });
  }

  //memanggil api untuk menyimpan data
  async onUpdate() {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('anggota')
        .update({
                  nama: this.state.nama,
                  jurusan: this.state.jurusan,
                })
        .eq('nim', this.state.nim);

      //menampilkan response
      let message = 'Data berhasil diubah';
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

  async onDelete() {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('anggota')
        .delete()
        .eq('nim', this.state.nim);

      //menampilkan response message
      let message = 'Data berhasil diubah';
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
            value={this.state.nim.toString()}
            onChangeText={text => this.setState({nim:text})}
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

export default AnggotaUpdateScreen;