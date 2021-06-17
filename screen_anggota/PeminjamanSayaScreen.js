import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Portal, Modal, ActivityIndicator, Button, IconButton } from 'react-native-paper';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';
import dateFormatDB from '../comp/dateFormatDB';
import storeApp from '../config/storeApp';

class PeminjamanSayaScreen extends Component {

  constructor(props) {
      super(props);

      //redux variable
      this.state = storeApp.getState();  
      storeApp.subscribe(()=>{
        this.setState(storeApp.getState());
      });

      this.state = {
        ...this.state,
      };
  }

  componentDidMount() {
      this.getData();

      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getData();
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/peminjaman/saya/?nim='+this.state.nim;
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
          this.setState({data:data, isLoading:false});
      })
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Content title="Peminjaman Saya" />
          </Appbar.Header>

          <ScrollView>
          <List.Section>
              {/*loop data state*/}

              {this.state.data && this.state.data.map((row,key) => (
                <List.Item
                  key={key}
                  title={dateFormatDB(row.tanggal_pinjam)}
                  description={'Batas Kembali: '+dateFormatDB(row.tanggal_batas_kembali)+' \nPetugas: '+row.nama_petugas}
                  right={props => <List.Icon icon="book" />}
                  onPress={() => this.props.navigation.navigate('PeminjamanSayaBukuScreen', {peminjaman_id: row.id, nama: row.nama_anggota, tanggal_pinjam: row.tanggal_pinjam})}
                />
              ))}
              {/*end loop*/}
          </List.Section>
          </ScrollView>

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>

        </PaperProvider>
      )
  }
}

export default PeminjamanSayaScreen;