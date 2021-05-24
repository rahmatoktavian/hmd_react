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
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'black',
  },
};

//screen
import HomeScreen from './screen_nav/HomeScreen';
import ProfileScreen from './screen_nav/ProfileScreen';
import ProfileDetailScreen from './screen_nav/ProfileDetailScreen';

export default function App() {
  return (
  	<PaperProvider theme={theme}>
	    <NavigationContainer>
	      	<BottomTab.Navigator
	      		activeColor="black"
	          	inactiveColor="grey"
	          	barStyle={{backgroundColor:theme.colors.primary}} 
	          	shifting={false}
	        >
				<BottomTab.Screen 
					name="HomeScreen" 
					component={HomeScreen} 
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home-outline" color={color} size={25} />)
					}}
				/>
				<BottomTab.Screen 
					name="ProfileScreen"
					options={{
						tabBarLabel: 'Profile',
						tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account-outline" color={color} size={25} />)
					}}
				>
				{() => (
              		<Stack.Navigator>
		                <Stack.Screen 
		                  name="ProfileScreen"
		                  component={ProfileScreen}
		                  options={{ headerShown: false }} 
		                />
		                <Stack.Screen 
		                  name="ProfileDetailScreen"
		                  component={ProfileDetailScreen}
		                  options={{ headerShown: false }} 
		                />
					</Stack.Navigator>
				)}
                </BottomTab.Screen>

	    	</BottomTab.Navigator>
	    </NavigationContainer>
    </PaperProvider>
  );
}