import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
// import Home from './screens/Home';
import Navigation from './Navigation'

export default function App() {
  return < Navigation />
  // return <Home />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
