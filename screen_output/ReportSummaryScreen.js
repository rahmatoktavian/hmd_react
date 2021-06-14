import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Portal, Modal, ActivityIndicator, Button, } from 'react-native-paper';

import Theme from '../config/Theme';

class ReportSummaryScreen extends Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
        <PaperProvider theme={Theme}>
          <Appbar.Header>
            <Appbar.Action icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="ReportSummaryScreen" />
          </Appbar.Header>

          <ScrollView>
          </ScrollView>

        </PaperProvider>
      )
  }
}

export default ReportSummaryScreen;