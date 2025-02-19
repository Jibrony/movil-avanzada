import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]); // Lista completa de Pokémon
  const [filteredPokemonList, setFilteredPokemonList] = useState([]); // Lista filtrada de Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState({}); // Pokémon seleccionados
  const [searchText, setSearchText] = useState(''); // Texto del buscador

  // Obtener la lista de Pokémon de la API
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
        setFilteredPokemonList(data.results); // Inicialmente, la lista filtrada es igual a la lista completa
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Función para manejar el cambio en el buscador
  const handleSearch = (text) => {
    setSearchText(text); // Actualizar el texto del buscador
    if (text) {
      // Filtrar la lista de Pokémon que coincidan con el texto
      const filtered = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPokemonList(filtered);
    } else {
      // Si el texto está vacío, mostrar la lista completa
      setFilteredPokemonList(pokemonList);
    }
  };

  const handleCheckboxToggle = (pokemonName) => {
    setSelectedPokemon({
      ...selectedPokemon,
      [pokemonName]: !selectedPokemon[pokemonName],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Flexbox</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Lista de Pokémon */}
      <ScrollView style={styles.pokemonList}>
        {filteredPokemonList.map((pokemon, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              value={selectedPokemon[pokemon.name] || false} // Estado del checkbox
              onValueChange={() => handleCheckboxToggle(pokemon.name)} // Manejador de cambios
              color={selectedPokemon[pokemon.name] ? '#4630EB' : undefined} // Color cuando está seleccionado
            />
            <Text style={styles.label}>{pokemon.name}</Text>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    width: '80%',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  pokemonList: {
    width: '80%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
});