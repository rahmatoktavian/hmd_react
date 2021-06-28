import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

//template
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from './config/Theme';

//navigation
import LoginScreen from './screen_login/LoginScreen';
import AnggotaNav from './navigation/AnggotaNav';
import PetugasNav from './navigation/PetugasNav';

//storeApp
import storeApp from './config/storeApp';

class App extends React.Component {
	constructor(props) {
	  super(props);

	  //redux variable
	  this.state = storeApp.getState();  
	  storeApp.subscribe(()=>{
	    this.setState(storeApp.getState());
	  });

	  this.state = {
	    ...this.state,
	  };
	}

	render() {

		//sudah login
		if(this.state.isLogin == true) {

			//jika login: anggota
			if(this.state.user_type == 'anggota') {
				return (
						<PaperProvider theme={Theme}>
							<AnggotaNav />
						</PaperProvider>
					)
			
			//petugas
			} else {
				return (
						<PaperProvider theme={Theme}>
							<PetugasNav />
						</PaperProvider>
					)

			}
		
		//belum login
		} else {
			return (
				<PaperProvider theme={Theme}>
					<LoginScreen />
				</PaperProvider>
			)
		}
		
	}
}

export default App;