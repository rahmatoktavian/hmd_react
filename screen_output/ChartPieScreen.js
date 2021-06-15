import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Provider as PaperProvider, Appbar, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { PieChart } from "react-native-chart-kit";

import BaseUrl from '../config/BaseUrl';
import Theme from '../config/Theme';

class ChartPieScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
        piechart_data: []
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

  getRandomColor() {
    let randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';  
    return randomColor;
  }

  async getData() {
      this.setState({isLoading:true});

      //api url & parameter
      let apiurl = BaseUrl()+'/output/rekap_buku_perkategori';
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

          //convert data api menjadi format chart
          let piechart_data = [];
          data.map(row => {
            piechart_data.push({
              name: row.nama,
              value: row.total_buku,
              color: this.getRandomColor(),
              legendFontColor: "#7F7F7F",
            })
          })

          //memasukan respon ke state untuk chart
          this.setState({piechart_data:piechart_data, isLoading:false});
      })
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Rekap Buku per Kategori" />
          </Appbar.Header>

          {<PieChart
            data={this.state.piechart_data}
            width={Dimensions.get("window").width}
            height={250}
            chartConfig={{color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,}}
            accessor={"value"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 10]}
            absolute
          />}

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>

        </PaperProvider>
      )
  }
}

export default ChartPieScreen;