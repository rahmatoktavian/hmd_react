import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, HelperText, Portal, Modal, ActivityIndicator, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class BukuInsertScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        kategori_buku_data: [],

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

  getKategoriData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/kategori_buku';
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
          this.setState({kategori_buku_data:data, isLoading:false});
      })
  }

  getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let id = this.props.route.params.id;
      let apiurl = BaseUrl()+'/buku/detail/?id='+id;

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
              kategori_id: data.kategori_id,
              judul: data.judul,
              stok: data.stok,
              isLoading:false
          });
      })
  }

  //memanggil api untuk menyimpan data
  async onUpdate() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/buku';

      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.route.params.id,
            kategori_id: this.state.kategori_id,
            judul: this.state.judul,
            stok: this.state.stok,
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
              { text: "OK", onPress: () => this.props.navigation.navigate('BukuListScreen') }
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

  async onDelete() {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/buku/delete/?id='+this.props.route.params.id;
      
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
              { text: "OK", onPress: () => this.props.navigation.navigate('BukuListScreen') }
            ]
          );
      })
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Update Buku" />
            <Appbar.Action icon="delete" onPress={() => this.onDeleteConfirm()} />
          </Appbar.Header>

          <ScrollView>
            <HelperText style={{marginHorizontal:10, marginTop:10}}>Kategori</HelperText>
            <Picker
              selectedValue={this.state.kategori_id}
              onValueChange={(itemValue, itemIndex) => this.setState({kategori_id:itemValue})}
              style={{marginHorizontal:10}}
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
              value={this.state.stok}
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
          </ScrollView>
          
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