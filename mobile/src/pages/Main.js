import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// {{}} = duas chaves, primeira chave html, segunda chave objeto dentro do html
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }){

    const [devs, setDevs] = useState([]);

    const [currentRegion, setCurrentRegion ] = useState(null);

    useEffect(()=>{
        async function loadInicialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){ // se o usuário deu permissão de localização
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true // habilita o GPS do usuário
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, // zoom
                    longitudeDelta: 0.04, // zoom
                })
            }
        }
        loadInicialPosition(); 
    },[]);

    async function loadDevs(){
        
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });

        setDevs(response.data.devs);

    }

    function handleRegionChanged(region){
        console.log(region);
        setCurrentRegion(region);

    }

    if(!currentRegion){  // so carrega o mapa, não renderiza
        return null;
    }

    return (
        <>
        <MapView 
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map} 
            >
            {devs.map(dev =>(
                <Marker 
                key={dev._id}
                coordinate={ {
                    longitude: dev.location.coordinates[0],
                    latitude: dev.location.coordinates[1]                    
                    } }>  
                <Image style={styles.avatar} source={ { uri: dev.avatar_url } } />
                <Callout onPress={()=>{
                    // navegação
                    navigation.navigate('Profile', { github_username: dev.github_username });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.Techs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
                </Marker>
            ))}
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
             />

            <TouchableOpacity  onPress={loadDevs} style={styles.laodButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>

        </View>
        </>
    ); 
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute', // flutua em cima do formulário
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
        //display: flex ou none
    },

    searchInput: {
        flex: 1, // ocupar o máximo de espaço possível do que sobrou
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
    },

    laodButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',        
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;