import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, HelperText, Portal, Modal, ActivityIndicator, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import supabase from '../config/supabase';
import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class BukuInsertScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        kategori_buku_data: [],

        id: this.props.route.params.id,
        kategori_id: '',
        judul: '',
        stok: '',
        isLoading: false,
      };
  }

  componentDidMount() {
      this.getKategoriData();
      this.getData();
  }

  async getKategoriData() {
      this.setState({isLoading:true});

      ///memanggil api supabase
      let { data, error } = await supabase
        .from('kategori_buku')
        .select('id, nama')
        .order('nama', {ascending:true});

      //memasukan respon ke state untuk data di render
      this.setState({kategori_buku_data:data, isLoading:false});
  }

  async getData() {
      this.setState({isLoading:true});

      //memanggil api supabase (get data anggota by nim)
      let { data, error } = await supabase
        .from('buku')
        .select('kategori_id, judul, stok')
        .eq('id', this.state.id)
        .single()

      //memasukan respon ke state untuk data di render
      this.setState({
        kategori_id: data.kategori_id,
        judul: data.judul,
        stok: data.stok, 
        isLoading:false
      });
  }

  //memanggil api untuk menyimpan data
  async onUpdate() {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('buku')
        .update({
                  kategori_id: this.state.kategori_id,
                  judul: this.state.judul,
                  stok: this.state.stok,
                })
        .eq('id', this.state.id);

      //menampilkan response
      let message = 'Data berhasil diubah';
      if(error) {
        message = error.message;
      }

      Alert.alert(
        "Pemberitahuan",
        message,
        [
          { text: "OK", onPress: () => this.props.navigation.navigate('BukuListScreen') }
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
        .from('buku')
        .delete()
        .eq('id', this.state.id);

      //menampilkan response message
      let message = 'Data berhasil diubah';
      if(error) {
        message = error.message;
      }

      Alert.alert(
        "Pemberitahuan",
        message,
        [
          { text: "OK", onPress: () => this.props.navigation.navigate('BukuListScreen') }
        ]
      );

      this.setState({isLoading:false});
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Update Buku" />
            <Appbar.Action icon="delete" onPress={() => this.onDeleteConfirm()} />
          </Appbar.Header>

          
          <HelperText style={{marginHorizontal:10, marginTop:10}}>Kategori</HelperText>
          <Picker
            selectedValue={this.state.kategori_id}
            onValueChange={(itemValue, itemIndex) => this.setState({kategori_id:itemValue})}
            style={{marginHorizontal:10}}
            mode='dropdown'
          >
            <Picker.Item label="Pilih Kategori" value="" />
            {/*loop data state*/}
            {this.state.kategori_buku_data.map((row,key) => (
              <Picker.Item key={key} label={row.nama} value={row.id} />
            ))}
            {/*end loop*/}
          </Picker>

          <TextInput
            label="Judul"
            value={this.state.judul}
            onChangeText={text => this.setState({judul:text})}
            style={{margin:10}}
          />

          <TextInput
            label="Stok"
            value={this.state.stok.toString()}
            onChangeText={text => this.setState({stok:text})}
            keyboardType="numeric"
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
              <ActivityIndicator akategori_idating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>
        </PaperProvider>
      )
  }
}

export default BukuInsertScreen;