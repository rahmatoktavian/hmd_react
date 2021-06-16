import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, TextInput, DataTable, Portal, Dialog, Modal, ActivityIndicator, Button, List, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing'

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';
import dateFormatDB from '../comp/dateFormatDB';
import dateFormat from '../comp/dateFormat';

class ReportDetailScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        data: [],

        displayFilter: false,

        displayDateTimePickerMulai: false,
        displayDateTimePickerAkhir: false,
        petugas_data: [],

        petugas_id: '',
        nama_anggota: '',
        tanggal_pinjam_mulai: new Date(),
        tanggal_pinjam_akhir: new Date(),
      }
  }

  componentDidMount() {
      this.getData();
      this.getPetugasData();

      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getData();
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getPetugasData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/petugas';
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
          this.setState({petugas_data:data, isLoading:false});
      })
  }

  async getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/output/detil_peminjaman';
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            tanggal_pinjam_mulai: dateFormat(this.state.tanggal_pinjam_mulai),
            tanggal_pinjam_akhir: dateFormat(this.state.tanggal_pinjam_akhir),
            petugas_id: this.state.petugas_id,
            nama_anggota: this.state.nama_anggota,
          })
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
        content += '<td>'+dateFormatDB(row.tanggal_pinjam)+'</td>';
        content += '<td>'+dateFormatDB(row.tanggal_batas_kembali)+'</td>';
      content += '</tr>';
    })
    content += '</table>';
    content += '<style>th, td {border: 1px solid black;border-collapse: collapse;}</style>';

    let response = await Print.printToFileAsync({
      html: content
    });

    Sharing.shareAsync(response.uri);
  }

  onFilter() {
    this.setState({displayFilter:false});
    this.getData();
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Detil Peminjaman" />
            <Appbar.Action icon="magnify" onPress={() => this.setState({displayFilter:true})} />
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
                <DataTable.Cell>{dateFormatDB(row.tanggal_pinjam)}</DataTable.Cell>
                <DataTable.Cell>{dateFormatDB(row.tanggal_batas_kembali)}</DataTable.Cell>
              </DataTable.Row>
            ))}
            {/*end loop*/}

          </DataTable>
          </ScrollView>

          {/*export pdf*/}
          {this.state.data &&
          <Button 
              mode="outlined" 
              icon="download" 
              onPress={() => this.onExportPDF()}
              style={{margin:20}}
          >
            Export PDF
          </Button>
          }

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>

          {/*filter*/}
          <Portal>
            <Dialog
              visible={this.state.displayFilter} 
              onDismiss={() => this.setState({displayFilter:false})} 
            >
              <Dialog.Title>Filter</Dialog.Title>
              <Dialog.ScrollArea>

                  {/*tgl pinjam mulai*/}
                  <HelperText style={{marginBottom:-20}}>Tanggal Pinjam Mulai</HelperText>
                  <List.Item
                      title={dateFormat(this.state.tanggal_pinjam_mulai)}
                      right={() => <List.Icon icon="calendar" />}
                      onPress={() => this.setState({displayDateTimePickerMulai:true})}
                  />

                  {this.state.displayDateTimePickerMulai && (
                      <DateTimePicker
                        value={this.state.tanggal_pinjam_mulai}
                        display="calendar"
                        onChange={(event,date) => this.setState({displayDateTimePickerMulai:false, tanggal_pinjam_mulai:date})}
                      />
                  )}

                  {/*tgl pinjam akhir*/}
                  <HelperText style={{marginBottom:-20}}>Tanggal Pinjam Akhir</HelperText>
                  <List.Item
                      title={dateFormat(this.state.tanggal_pinjam_akhir)}
                      right={() => <List.Icon icon="calendar" />}
                      onPress={() => this.setState({displayDateTimePickerAkhir:true})}
                  />

                  {this.state.displayDateTimePickerAkhir && (
                      <DateTimePicker
                        value={this.state.tanggal_pinjam_akhir}
                        display="calendar"
                        onChange={(event,date) => this.setState({displayDateTimePickerAkhir:false, tanggal_pinjam_akhir:date})}
                      />
                  )}

                  {/*petugas*/}
                  <TextInput
                    label="Nama Anggota"
                    value={this.state.nama_anggota}
                    onChangeText={text => this.setState({nama_anggota:text})}
                    style={{marginLeft:5, marginTop:-20, backgroundColor:'white'}}
                  />

                  {/*petugas*/}
                  <HelperText style={{marginBottom:-20}}>Petugas</HelperText>
                  <Picker
                    selectedValue={this.state.petugas_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({petugas_id:itemValue})}
                    style={{margin:10}}
                    mode='dropdown'
                  >
                    <Picker.Item label="Semua Petugas" value="" />
                    {/*loop data state*/}
                    {this.state.petugas_data.map((row,key) => (
                      <Picker.Item key={key} label={row.nama} value={row.id} />
                    ))}
                    {/*end loop*/}
                  </Picker>

              </Dialog.ScrollArea>

              <Dialog.Actions style={{ justifyContent:'flex-start', marginLeft:20}}>
                <Button icon="magnify" mode="contained" onPress={() => this.onFilter()}>Filter</Button>
                <Button icon="cancel" onPress={() => this.setState({displayFilter:false})}>Batal</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/*end filter*/}

        </PaperProvider>
      )
  }
}

export default ReportDetailScreen;