import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Bienvenido a PetsHub!</Text>
      <Link href="/" asChild>
        <Button title="Cerrar sesión" />
      </Link>
    </View>
  );
}