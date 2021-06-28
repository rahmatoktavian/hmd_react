import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Title } from 'react-native-paper';

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';
import storeApp from '../config/storeApp';

class ProfileScreen extends Component {

  constructor(props) {
      super(props);

      //menarik redux variable
      this.state = storeApp.getState();  
      storeApp.subscribe(()=>{
        this.setState(storeApp.getState());
      });

      this.state = {
        ...this.state,
      };
  }

  componentDidMount() {
    this.getAnggotaData();
  }

  getAnggotaData() {
      this.setState({isLoading:true});
      
      //api url & parameter
      let nim = this.state.nim;
      let apiurl = BaseUrl()+'/anggota/detail/?nim='+nim;
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
              nim: data.nim,
              nama: data.nama,
              jurusan: data.jurusan, 
              isLoading:false
            });
      })
  }

  onLogout() {
      //update redux
      storeApp.dispatch({
          type: 'LOGIN',
          payload: { isLogin:false, user_type:'', nim:'', petugas_id:'' }
      });
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Content title="Profile" />
            <Appbar.Action icon="power" onPress={() => this.onLogout()} />
          </Appbar.Header>

          <View style={{alignSelf:'center', margin:10}}>
            <Title>Selamat Datang</Title>
          </View>

          <List.Section>
              <List.Item
                key={0}
                title={this.state.nama}
                description="Nama"
                left={props => <List.Icon icon="account" />}
              />
              <List.Item
                key={1}
                title={this.state.nim}
                description="NIM"
                left={props => <List.Icon icon="tag" />}
              />
              <List.Item
                key={2}
                title={this.state.jurusan}
                description="Jurusan"
                left={props => <List.Icon icon="school" />}
              />
          </List.Section>

        </PaperProvider>
      )
  }
}

export default ProfileScreen;