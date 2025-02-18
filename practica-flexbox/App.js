import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Flexbox</Text>

      <Image
        source={require('./assets/cheems.png')}
        style={styles.image}
      />


      <Text style={styles.h2}>Andrey Arce</Text>
      <Text style={styles.h3}>Trikitrakatelas</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.btn1}>
          <Button title="Button 1" onPress={() => alert('Button 1 presionado')} />
        </View>
        <View style={styles.btn2}>
          <Button title="Button 2" onPress={() => alert('Button 2 presionado')} />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    top: 100,
    left: 130,
    marginBottom: 50,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    top: 100,
    left: 125,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 150,
    left: 135,
  },
  image: {
    width: 150,
    height: 150,
    top: 100,
    left: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
    top: 200,
    left: 80,
  },
  btn1: {
    color: 'white',
    backgroundColor: '#1251ac',
  },
  btn2: {
    color: 'white',
    backgroundColor: '#FF0000',
  },
});

