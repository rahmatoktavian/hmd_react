import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class PeminjamanBukuInsertScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        buku_data: [],

        peminjaman_id: this.props.route.params.peminjaman_id,
        buku_id: '',
        isLoading: false,
      };
  }

  componentDidMount() {
      this.getBukuData();
  }

  async getBukuData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/buku';
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
          this.setState({buku_data:data, isLoading:false});
      })
  }

  //memanggil api untuk menyimpan data
  async onInsert() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/peminjaman_buku';

      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            buku_id: this.state.buku_id,
            peminjaman_id: this.state.peminjaman_id,
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
              { text: "OK", onPress: () => this.props.navigation.navigate('PeminjamanBukuListScreen', {peminjaman_id: this.state.peminjaman_id}) }
            ]
          );
      });
  }

  //memanggil api untuk menyimpan data
  async onInsertTrans() {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('peminjaman_buku')
        .insert({
                  peminjaman_id: this.state.peminjaman_id,
                  buku_id: this.state.buku_id,
                  buku_rusak: false,
                  buku_hilang: false,
                });

      //menampilkan response
      let message = 'Data berhasil ditambah';
      if(error) {
        message = error.message;
      } else {
        //ambil data stok buku
        let { data:buku } = await supabase
          .from('buku')
          .select('stok')
          .eq('id', this.state.buku_id)
          .single();

        //stok baru baru
        let newstok = buku.stok - 1;

        //update stok buku
        let { data:buku_update } = await supabase
          .from('buku')
          .update({
                    stok: newstok
                  })
          .eq('id', this.state.buku_id)
      }

      Alert.alert(
        "Pemberitahuan",
        message,
        [
          { text: "OK", onPress: () => this.props.navigation.navigate('PeminjamanBukuListScreen', {peminjaman_id: this.state.peminjaman_id}) }
        ]
      );

      this.setState({isLoading:false});
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Insert Peminjaman Buku" />
          </Appbar.Header>

          <Picker
            selectedValue={this.state.buku_id}
            onValueChange={(itemValue, itemIndex) => this.setState({buku_id:itemValue})}
            style={{margin:10}}
            mode='dropdown'
          >
            <Picker.Item label="Pilih Buku" value="" />
            {/*loop data state*/}
            {this.state.buku_data.map((row,key) => (
              <Picker.Item key={key} label={row.judul} value={row.id} />
            ))}
            {/*end loop*/}
          </Picker>

          <Button 
              mode="contained" 
              icon="check" 
              onPress={() => this.onInsert()}
              style={{margin:10}}
          >
            Simpan
          </Button>

          <Button 
              mode="contained" 
              icon="check" 
              onPress={() => this.onInsertTrans()}
              style={{margin:10}}
          >
            Simpan Trans
          </Button>

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator abuku_idating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>
        </PaperProvider>
      )
  }
}

export default PeminjamanBukuInsertScreen;