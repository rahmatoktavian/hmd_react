import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Button, List } from 'react-native-paper';

class BukuListScreen extends Component {

  constructor(props) {
      super(props);

      this.state = {
      };
  }

  componentDidMount() {
      
  }

  render() {
      return (
        <View>
          <Appbar.Header>
            <Appbar.Content title="List Buku" />
          </Appbar.Header>

          <List.Section>
              <List.Item
                title="First Book"
                description="Item description"
                right={props => <List.Icon {...props} icon="pencil" />}
                onPress={() => this.props.navigation.navigate('BukuUpdateScreen', {id:'First User'})}
              />
          </List.Section>
          
          <Button 
              mode="contained" 
              icon="plus" 
              onPress={() => this.props.navigation.navigate('BukuInsertScreen')}
              style={{margin:20}}
          >
            Insert Buku
          </Button>

        </View>
      )
  }
}

export default BukuListScreen;