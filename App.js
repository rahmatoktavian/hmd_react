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

//screen single
import AnggotaListScreen from './screen_crud/AnggotaListScreen';
import AnggotaInsertScreen from './screen_crud/AnggotaInsertScreen';
import AnggotaUpdateScreen from './screen_crud/AnggotaUpdateScreen';

//screen 1-many
import BukuListScreen from './screen_crud/BukuListScreen';
import BukuInsertScreen from './screen_crud/BukuInsertScreen';
import BukuUpdateScreen from './screen_crud/BukuUpdateScreen';

//screen many-many
import PeminjamanListScreen from './screen_crud/PeminjamanListScreen';
import PeminjamanBukuListScreen from './screen_crud/PeminjamanBukuListScreen';
import PeminjamanBukuInsertScreen from './screen_crud/PeminjamanBukuInsertScreen';
import PeminjamanBukuInsertBarcodeScreen from './screen_crud/PeminjamanBukuInsertBarcodeScreen';

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
	        	{/*tab anggota dengan stack list, insert & update*/}
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

      	{/*tab buku dengan stack list, insert & update*/}
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

        {/*tab peminjaman dengan stack list, listbuku & listbuku insert*/}
				<BottomTab.Screen 
					name="PeminjamanListScreen"
					options={{
						tabBarLabel: 'Peminjaman',
						tabBarIcon: ({color}) => (<MaterialCommunityIcons name="clipboard-list" color={color} size={25} />)
					}}
				>
				{() => (
              		<Stack.Navigator>
		                <Stack.Screen 
		                  name="PeminjamanListScreen"
		                  component={PeminjamanListScreen}
		                  options={{headerShown:false}}
		                />
		                <Stack.Screen 
		                  name="PeminjamanBukuListScreen"
		                  component={PeminjamanBukuListScreen}
		                  options={{headerShown:false}} 
		                />
		                <Stack.Screen 
		                  name="PeminjamanBukuInsertScreen"
		                  component={PeminjamanBukuInsertScreen}
		                  options={{headerShown:false}}
		                />
		                <Stack.Screen 
		                  name="PeminjamanBukuInsertBarcodeScreen"
		                  component={PeminjamanBukuInsertBarcodeScreen}
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