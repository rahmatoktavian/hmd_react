import React from 'react';

//bottom tab
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTab = createMaterialBottomTabNavigator();

//stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//template
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from '../config/Theme';

//screens
import ProfileScreen from '../screen_anggota/ProfileScreen';
import PeminjamanSayaScreen from '../screen_anggota/PeminjamanSayaScreen';
import PeminjamanSayaBukuScreen from '../screen_anggota/PeminjamanSayaBukuScreen';

export default function AnggotaNav() {
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
						name="ProfileScreen"
						component={ProfileScreen}
						options={{
							tabBarLabel: 'Profile',
							tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" color={color} size={25} />)
						}}
					/>

	        {/*tab anggota dengan stack list, insert & update*/}
	        <BottomTab.Screen 
						name="PeminjamanSayaScreen"
						options={{
							tabBarLabel: 'Peminjaman Saya',
							tabBarIcon: ({color}) => (<MaterialCommunityIcons name="book" color={color} size={25} />)
						}}
					>
					{() => (
	              		<Stack.Navigator>
			                <Stack.Screen 
			                  name="PeminjamanSayaScreen"
			                  component={PeminjamanSayaScreen}
			                  options={{headerShown:false}} 
			                />
			                <Stack.Screen 
			                  name="PeminjamanSayaBukuScreen"
			                  component={PeminjamanSayaBukuScreen}
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