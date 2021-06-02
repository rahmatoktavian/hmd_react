import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Provider as PaperProvider, List, Appbar, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import supabase from '../config/supabase';
import Theme from '../config/Theme';

class PeminjamanBukuListScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        peminjaman_id: this.props.route.params.peminjaman_id,
        nama: this.props.route.params.nama,
        tanggal_pinjam: this.props.route.params.tanggal_pinjam,

        data: [],
        isLoading: false,
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

      //memanggil api supabase
      let { data, error } = await supabase
        .from('peminjaman_buku')
        .select('id, buku(judul)')
        .eq('peminjaman_id', this.state.peminjaman_id)
        .order('peminjaman_id', {ascending:false});

      //memasukan respon ke state untuk loop data di render
      this.setState({data:data, isLoading:false});
  }

  onDeleteConfirm(id) {
    Alert.alert(
      "Perhatian",
      "Data akan dihapus",
      [ 
        { text: "Batal" },
        { text: "OK", onPress: () => this.onDelete(id) }
      ]
    );
  }

  async onDelete(id) {
      this.setState({isLoading:true});

      //memanggil api supabase
      let { data, error } = await supabase
        .from('peminjaman_buku')
        .delete()
        .eq('id', id);

      //menampilkan response message
      let message = 'Data berhasil dihapus';
      if(error) {
        message = error.message;
      }

      Alert.alert(
        "Pemberitahuan",
        message,
        [
          { text: "OK" }
        ]
      );

      this.setState({isLoading:false});
      this.getData();
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Peminjaman Buku" />
          </Appbar.Header>

          <List.Item
            key={0}
            title={this.state.nama}
            description={'Tgl Pinjam: '+this.state.tanggal_pinjam}
            left={props => <List.Icon icon="account" />}
            onPress={() => this.onDeleteConfirm(row.id)}
          />

          <ScrollView>
          <List.Section title="Buku">
              {/*loop data state*/}

              {this.state.data.map((row,key) => (
                <List.Item
                  key={key}
                  title={row.buku.judul}
                  left={props => <List.Icon icon="book" />}
                  right={props => <List.Icon icon="delete" />}
                  onPress={() => this.onDeleteConfirm(row.id)}
                />
              ))}
              {/*end loop*/}
          </List.Section>
          </ScrollView>
          
          <Button 
              mode="contained" 
              icon="plus" 
              onPress={() => this.props.navigation.navigate('PeminjamanBukuInsertScreen', {peminjaman_id: this.state.peminjaman_id})}
              style={{margin:20}}
          >
            Insert Buku
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

export default PeminjamanBukuListScreen;