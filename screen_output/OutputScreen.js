import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import Theme from '../config/Theme';

class OutputScreen extends Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Content title="Output" />
          </Appbar.Header>

          <ScrollView>
          <List.Section>
              <List.Item
                key={0}
                title="Pie Chart"
                left={props => <List.Icon icon="chart-pie" />}
                right={props => <List.Icon icon="arrow-right" />}
                onPress={() => this.props.navigation.navigate('ChartPieScreen')}
              />
              <List.Item
                key={2}
                title="Report Summary"
                left={props => <List.Icon icon="folder" />}
                right={props => <List.Icon icon="arrow-right" />}
                onPress={() => this.props.navigation.navigate('ReportSummaryScreen')}
              />
              <List.Item
                key={3}
                title="Report Detail"
                left={props => <List.Icon icon="newspaper" />}
                right={props => <List.Icon icon="arrow-right" />}
                onPress={() => this.props.navigation.navigate('ReportDetailScreen')}
              />
          </List.Section>
          </ScrollView>

        </PaperProvider>
      )
  }
}

export default OutputScreen;