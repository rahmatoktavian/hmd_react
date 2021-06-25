import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class PeminjamanBukuInsertBarcodeScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        buku_data: [],

        peminjaman_id: this.props.route.params.peminjaman_id,
        buku_id: '',
        isLoading: false,

        barcodePermit: '',
        barcodeNumber: '',
      };
  }

  componentDidMount() {
      this.barcodeReqPermit();
  }
  
  async barcodeReqPermit() {
    this.setState({isLoading:true});

    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({barcodePermit:status});

    this.setState({isLoading:false});
  }

  //memanggil api untuk menyimpan data
  async onInsertTrans(barcode) {
      this.setState({isLoading:true});

      //api url
      let apiurl = BaseUrl()+'/peminjaman_buku/insert_trans_barcode';

      //menyiapkan data untuk dikirim ke server api
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            barcode: barcode,
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

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Insert Peminjaman Buku" />
          </Appbar.Header>

          {(this.state.barcodePermit == 'granted')  &&
              <BarCodeScanner
                onBarCodeScanned={({type, data}) => this.onInsertTrans(data)}
                style={StyleSheet.absoluteFillObject}
              />
          }

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator abuku_idating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>
        </PaperProvider>
      )
  }
}

export default PeminjamanBukuInsertBarcodeScreen;