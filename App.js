import 'react-native-gesture-handler';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, Button, Card, Text, Divider, Title, Paragraph } from 'react-native-paper'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const axios = require('axios').default;
const Drawer = createDrawerNavigator();

// ---------------------------------------- //

function RANDOMIZER({ navigation }) {
  const [numero, setNumero] = useState(1);
  const [pokemon, setPokemon] = useState({});

  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const random = () => {
    setNumero(numeroAleatorio(1, 1008));
  };

  const getPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    const respuesta = await axios.get(url);
    setPokemon(respuesta.data);
    console.log(respuesta.data);
  };

  useEffect(() => {
    getPokemon();
  }, [numero]);

  const objPokemon = {
    nombre: pokemon.name,
    id: pokemon.id,
    tipo1: pokemon.types == undefined ? "" : pokemon.types[0].type.name,
    // tipo2: pokemon.types == undefined ? '': pokemon.types[1].type.name,
    tipo2:
      pokemon.types == undefined
        ? ""
        : pokemon.types[1] == undefined
        ? ""
        : pokemon.types[1].type.name,
    // tipo2: pokemon.types[1]
  };

  const { nombre, id, tipo1, tipo2} = objPokemon;

  return (
    <ScrollView>
       <Appbar.Header>
    <Appbar.Content title="POKEApi" />
  </Appbar.Header>
  <Card mode="outlined">
    <Card.Content  style={styles.container}>
    <Text variant="displayMedium">#{id} {nombre}</Text>
    <Button icon="creation" mode="contained-tonal" onPress={() => console.log('Pressed')}>
    {tipo1} + {tipo2}
  </Button>
    <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${numero}.png` }}style = {{ width: 250, height: 250 }} />
    <Text variant="headlineMedium" >NORMAL COLORS</Text>
    <Divider />
    <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${numero}.png` }}style = {{ width: 250, height: 250 }} />
    <Text variant="headlineMedium">SHINY COLORS</Text>
    </Card.Content>
  </Card>
  <Button icon="auto-fix" mode="contained" 
  onPress={random}>
    Surprise Pokemon
  </Button>
    </ScrollView>
  );
  }

// ---------------------------------------- //

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
        <Card mode="outlined">
    <Card.Content  style={styles.container}>
      <Title>★ TP2+3 de App Moviles ★</Title>
      <Paragraph>by Carolina Belen Ho</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://i.pinimg.com/originals/de/ed/d7/deedd73851f44c98c077e37504a53f2b.gif' }} />
  </Card>
  </ScrollView>
  );
}

// ---------------------------------------- //

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor:"#543089"
        }
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="RandomPokemon" component={RANDOMIZER} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });