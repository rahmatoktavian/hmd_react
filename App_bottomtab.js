import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Theme from './config/Theme';

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

//screen
import HomeScreen from './screen_bottomtab/HomeScreen';
import ProfileScreen from './screen_bottomtab/ProfileScreen';
import ProfileDetailScreen from './screen_bottomtab/ProfileDetailScreen';

export default function App() {
  return (
  	<PaperProvider theme={Theme}>
	    <NavigationContainer>
	      	<BottomTab.Navigator
	      		activeColor="black"
	          	inactiveColor="grey"
	          	barStyle={{backgroundColor:Theme.colors.primary}}
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
        					name="Profile"
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
