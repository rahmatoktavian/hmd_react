import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class AnggotaListScreen extends Component {

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

  getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/anggota';
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
            <Appbar.Content title="Anggota" />
          </Appbar.Header>

          <ScrollView>
          <List.Section>
              {/*loop data state*/}
              {this.state.data && this.state.data.map((row,key) => (
                <List.Item
                  key={key}
                  title={row.nama}
                  description={'NIM : '+row.nim}
                  right={props => <List.Icon icon="pencil" />}
                  onPress={() => this.props.navigation.navigate('AnggotaUpdateScreen', {nim: row.nim})}
                />
              ))}
              {/*end loop*/}
          </List.Section>
          </ScrollView>

          <Button
              mode="contained"
              icon="plus"
              onPress={() => this.props.navigation.navigate('AnggotaInsertScreen')}
              style={{margin:20}}
          >
            Insert Anggota
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

export default AnggotaListScreen;
