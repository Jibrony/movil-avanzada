import { View, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';

// Datos de ejemplo (luego vendrán de una API)
const places = [
  { id: '1', name: 'Casa de Luna', description: 'Patio grande y zona de juegos' },
  { id: '2', name: 'Guardería Peludos', description: 'Atención 24/7 con veterinario' },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Lugares disponibles</Text>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <Link href={`/place/${item.id}`} asChild>
            <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </Link>
        )}
      />
    </View>
  );
}