import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, Subheading, DataTable, Avatar, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { LineChart } from "react-native-chart-kit";

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';
import dateFormatDB from '../comp/dateFormatDB';

class HomeScreen extends Component {

  constructor(props) {
      super(props);
    
      this.state = {
        labels: [],
        datalist: [0],
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
      let apiurl = BaseUrl()+'/output/rekap_peminjaman_perhari';
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
      };

      //memanggil server api
      fetch(apiurl, options)
      .then(response => {return response.json()})

      //response dari api
      .then(responseData => {
          //menangkap response api
          let data = responseData.data;

          //convert data api menjadi format chart
          let labels = [];
          let datalist = [];
          data.map(row => {
            labels.push(dateFormatDB(row.tanggal_pinjam));
            datalist.push(row.total_pinjam);
          })

          //memasukan respon ke state untuk chart
          this.setState({data:data, labels:labels, datalist:datalist, isLoading:false});
      })
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Content title="Home" />
          </Appbar.Header>

          <ScrollView style={{backgroundColor:'white'}}>
            <Subheading style={{margin:20, color:Theme.colors.primary}}>Rekap Peminjaman Harian</Subheading>
            <LineChart
              data={{
                labels: this.state.labels,
                datasets: [ {data: this.state.datalist } ]
              }}
              width={Dimensions.get("window").width}
              height={325}
              chartConfig={{
                backgroundColor: "#000000",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
                labelColor: (opacity = 1) =>  `rgba(30, 144, 255, ${opacity})`,
              }}
              verticalLabelRotation={45}
              bezier={true}
              style={{
                marginVertical:10,
                marginLeft:-25,
              }}
            />
            
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tanggal</DataTable.Title>
                <DataTable.Title numeric>Total Peminjaman</DataTable.Title>
              </DataTable.Header>

              {/*loop data state*/}
              {this.state.data && this.state.data.map((row) => (
                <DataTable.Row>
                  <DataTable.Cell>{dateFormatDB(row.tanggal_pinjam)}</DataTable.Cell>
                  <DataTable.Cell numeric>{row.total_pinjam} Data</DataTable.Cell>
                </DataTable.Row>
              ))}
              {/*end loop*/}

            </DataTable>
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

export default HomeScreen;