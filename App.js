import { StatusBar } from 'expo-status-bar';
import React from 'react';

//stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//bottom tab
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTab = createMaterialBottomTabNavigator();

//template
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from './config/Theme';

//screen
import BukuListScreen from './screen_crud/BukuListScreen';
import BukuInsertScreen from './screen_crud/BukuInsertScreen';
import BukuUpdateScreen from './screen_crud/BukuUpdateScreen';

import AnggotaListScreen from './screen_crud/AnggotaListScreen';
import AnggotaInsertScreen from './screen_crud/AnggotaInsertScreen';
import AnggotaUpdateScreen from './screen_crud/AnggotaUpdateScreen';

export default function App() {
  return (
  	<PaperProvider theme={Theme}>
	    <NavigationContainer>
	      	<BottomTab.Navigator
	      		activeColor="white"
	          	inactiveColor="silver"
	          	barStyle={{backgroundColor:Theme.colors.primary}} 
	          	shifting={false}
	        >	
	        	<BottomTab.Screen 
					name="AnggotaListScreen"
					options={{
						tabBarLabel: 'Anggota',
						tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" color={color} size={25} />)
					}}
				>
				{() => (
              		<Stack.Navigator>
		                <Stack.Screen 
		                  name="AnggotaListScreen"
		                  component={AnggotaListScreen}
		                  options={{headerShown:false}}
		                />
		                <Stack.Screen 
		                  name="AnggotaInsertScreen"
		                  component={AnggotaInsertScreen}
		                  options={{headerShown:false}} 
		                />
		                <Stack.Screen 
		                  name="AnggotaUpdateScreen"
		                  component={AnggotaUpdateScreen}
		                  options={{headerShown:false}}
		                />
					</Stack.Navigator>
				)}
                </BottomTab.Screen>

				<BottomTab.Screen 
					name="BukuListScreen"
					options={{
						tabBarLabel: 'Buku',
						tabBarIcon: ({color}) => (<MaterialCommunityIcons name="book" color={color} size={25} />)
					}}
				>
				{() => (
              		<Stack.Navigator>
		                <Stack.Screen 
		                  name="BukuListScreen"
		                  component={BukuListScreen}
		                  options={{headerShown:false}}
		                />
		                <Stack.Screen 
		                  name="BukuInsertScreen"
		                  component={BukuInsertScreen}
		                  options={{headerShown:false}} 
		                />
		                <Stack.Screen 
		                  name="BukuUpdateScreen"
		                  component={BukuUpdateScreen}
		                  options={{headerShown:false}}
		                />
					</Stack.Navigator>
				)}
                </BottomTab.Screen>

	    	</BottomTab.Navigator>
	    </NavigationContainer>
    </PaperProvider>
  );
}