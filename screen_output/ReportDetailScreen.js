import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, Avatar, DataTable, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing'

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';
import dateFormat from '../comp/dateFormat';

class ReportDetailScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        data: []
      }
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
      let apiurl = BaseUrl()+'/peminjaman/index';
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
          
          //memasukan respon ke state untuk chart
          this.setState({data:data, isLoading:false});
      })
  }

  async onExportPDF() {
    let content = '';

    content += '<h3 style="text-align:center;">Rekap Buku per Kategori</h3>';
    content += '<table style="width:100%;">';

    content += '<tr>';
      content += '<td><strong>Anggota</strong></td>';
      content += '<td><strong>Petugas</strong></td>';
      content += '<td><strong>Tgl Pinjam</strong></td>';
      content += '<td><strong>Tgl Batas Kembali</strong></td>';
    content += '</tr>';

    this.state.data && this.state.data.map(row => {
      content += '<tr>';
        content += '<td>'+row.nama_anggota+'</td>';
        content += '<td>'+row.nama_petugas+'</td>';
        content += '<td>'+dateFormat(row.tanggal_pinjam)+'</td>';
        content += '<td>'+dateFormat(row.tanggal_batas_kembali)+'</td>';
      content += '</tr>';
    })
    content += '</table>';
    content += '<style>th, td {border: 1px solid black;border-collapse: collapse;}</style>';

    let response = await Print.printToFileAsync({
      html: content
    });

    Sharing.shareAsync(response.uri);
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Detil Peminjaman" />
          </Appbar.Header>

          <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Anggota</DataTable.Title>
              <DataTable.Title>Petugas</DataTable.Title>
              <DataTable.Title>Tgl Pinjam</DataTable.Title>
              <DataTable.Title>Tgl Batas Kembali</DataTable.Title>
            </DataTable.Header>
            
            {/*loop data state*/}
            {this.state.data && this.state.data.map((row) => (
              <DataTable.Row>
                <DataTable.Cell>{row.nama_anggota}</DataTable.Cell>
                <DataTable.Cell>{row.nama_petugas}</DataTable.Cell>
                <DataTable.Cell>{dateFormat(row.tanggal_pinjam)}</DataTable.Cell>
                <DataTable.Cell>{dateFormat(row.tanggal_batas_kembali)}</DataTable.Cell>
              </DataTable.Row>
            ))}
            {/*end loop*/}

          </DataTable>
          </ScrollView>

          <Button 
              mode="outlined" 
              icon="download" 
              onPress={() => this.onExportPDF()}
              style={{margin:20}}
          >
            Export PDF
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

export default ReportDetailScreen;