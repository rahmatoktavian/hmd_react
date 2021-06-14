import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Provider as PaperProvider, Appbar, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { LineChart } from "react-native-chart-kit";

import supabase from '../config/supabase';
import Theme from '../config/Theme';

class ChartLineScreen extends Component {

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

      //memanggil api supabase
      let { data } = await supabase
        .rpc('rekap_peminjaman_perhari')

      let labels = [];
      let datalist = [];
      data.map(row => {
        labels.push(row.tanggal_pinjam);
        datalist.push(row.total_pinjam);
      })

      //memasukan respon ke state untuk chart
      this.setState({labels:labels, datalist:datalist, isLoading:false});
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Line Chart" />
          </Appbar.Header>

          <LineChart
            data={{
              labels: this.state.labels,
              datasets: [ {data: this.state.datalist } ]
            }}
            width={Dimensions.get("window").width}
            height={250}
            yAxisLabel="Rp "
            yAxisSuffix="Jt"
            chartConfig={{
              backgroundColor: "#000000",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
              labelColor: (opacity = 1) =>  `rgba(30, 144, 255, ${opacity})`,
            }}
            bezier={true}
            style={{
              margin:10,
            }}
          />

          <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color={Theme.colors.primary} />
            </Modal>
          </Portal>

        </PaperProvider>
      )
  }
}

export default ChartLineScreen;