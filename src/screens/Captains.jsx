import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useAppContext } from '../provider/AppProvider';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const Captain = () => {
  const navigation = useNavigation();
  const { players } = useAppContext();
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  const handleNavigateToProductDetail = (item) => {
    navigation.navigate('Detail', {
      player: {
        ...item,
        isFavorite: favoritePlayers.some((player) => player.id === item.id),
      },
    });
  };

  const fetchFavoritePlayers = async () => {
    const favoritePlayers = await AsyncStorage.getItem('favoritePlayers');
    setFavoritePlayers(favoritePlayers ? JSON.parse(favoritePlayers) : []);
  };

  const handleSaveToFavorites = async (item) => {
    const isExisting = favoritePlayers.some((player) => player.id === item.id);
    if (isExisting) {
      const newFavoriteList = favoritePlayers.filter((player) => player.id !== item.id);
      setFavoritePlayers(newFavoriteList);

      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavoriteList));
      Alert.alert('Removed from Favorites', `${item.playerName} has been removed from your favorites.`);
    } else {
      const newFavoriteList = [...favoritePlayers, item];
      setFavoritePlayers(newFavoriteList);

      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavoriteList));
      Alert.alert('Added to Favorites', `${item.playerName} has been added to your favorites.`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritePlayers();
    }, []),
  );

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Players List
      </Text>

      <FlatList
        data={players.filter((player) => player.isCaptain && 2025 - player.YoB > 34)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', flexDirection: 'row' }}>
            <Pressable onPress={() => handleNavigateToProductDetail(item)}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{ width: 100, height: 100, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 }}
              />
            </Pressable>
            <View
              style={{
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              <Pressable onPress={() => handleNavigateToProductDetail(item)}>
                <Text style={{ fontSize: 14 }}>{item.playerName}</Text>
              </Pressable>
              {item.isCaptain && <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>Captain</Text>}
              <Text style={{ fontSize: 14, color: '#555' }}>Team: {item.team}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>Position: {item.position}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>Age: {2025 - item.YoB}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: favoritePlayers.some((player) => player.id === item.id) ? '#f00' : '#007bff',
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => {
                  handleSaveToFavorites(item);
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>{favoritePlayers.some((player) => player.id === item.id) ? 'Remove from Favorites' : 'Save To Favorites'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Captain;
