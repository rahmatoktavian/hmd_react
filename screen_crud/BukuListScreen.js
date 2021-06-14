import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import supabase from '../config/supabase';
import Theme from '../config/Theme';

class BukuListScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
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
        .from('buku')
        .select('id, judul, stok, kategori_buku(nama)')
        .order('id', {ascending:false});

      //memasukan respon ke state untuk loop data di render
      this.setState({data:data, isLoading:false});
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Content title="Buku" />
          </Appbar.Header>

          <ScrollView>
          <List.Section>
              {/*loop data state*/}

              {this.state.data.map((row,key) => (
                <List.Item
                  key={key}
                  title={row.judul}
                  description={'Kategori: '+row.kategori_buku.nama}
                  right={props => <List.Icon icon="pencil" />}
                  onPress={() => this.props.navigation.navigate('BukuUpdateScreen', {id: row.id})}
                />
              ))}
              {/*end loop*/}
          </List.Section>
          </ScrollView>
          
          <Button 
              mode="contained" 
              icon="plus" 
              onPress={() => this.props.navigation.navigate('BukuInsertScreen')}
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

export default BukuListScreen;