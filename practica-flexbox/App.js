import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, Image, ScrollView, Switch, TextInput } from 'react-native';

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

  // Función para manejar el cambio en los switches
  const handleToggle = (pokemonName) => {
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
            <Switch
              value={selectedPokemon[pokemon.name] || false}
              onValueChange={() => handleToggle(pokemon.name)}
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
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20, // Espacio inferior
    textAlign: 'center', // Centra el texto
  },
  searchContainer: {
    width: '80%', // Ancho del contenedor del buscador
    marginBottom: 20, // Espacio inferior
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center', // Centra el texto dentro del input
  },
  pokemonList: {
    width: '80%', // Ancho de la lista de Pokémon
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Centra verticalmente los elementos
    justifyContent: 'space-between', // Espacio entre el Switch y el texto
    marginBottom: 10, // Espacio inferior entre cada Pokémon
  },
  label: {
    fontSize: 16,
    marginLeft: 10, // Espacio entre el Switch y el texto
  },
});