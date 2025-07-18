import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useAppContext } from '../provider/AppProvider';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

const Favorite = () => {
  const navigation = useNavigation();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleNavigateToProductDetail = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const fetchFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites_products');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];
    setFavoriteProducts(favoritesArray);
  };
  useFocusEffect(
    useCallback(() => {
      fetchFavorite();
    }, []),
  );

  const handleClearFavorites = async () => {
    Alert.alert('Confirm', 'Are you sure you want to clear all favorites?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('favorites_products');
          Alert.alert('Success', 'All favorites cleared!');
          fetchFavorite();
        },
      },
    ]);
  };

  const handleRemoveFavorite = async (item) => {
    const existingData = await AsyncStorage.getItem('favorites_products');
    const favorites = existingData ? JSON.parse(existingData) : [];
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
    await AsyncStorage.setItem('favorites_products', JSON.stringify(updatedFavorites));
    Alert.alert('Success', 'Product removed from favorites!');
    fetchFavorite();
  };

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
        }}
      >
        My Jewelry Shop
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }} onPress={handleClearFavorites}>
          Clear Favorites
        </Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteProducts}
        keyExtractor={(item, index) => item.id + index}
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
                <Text style={{ fontSize: 14 }}>{item.jeName}</Text>
              </Pressable>
              {item.percentOff > 0 && <Text style={{ fontSize: 14, color: 'red' }}>{item.percentOff * 100}% off</Text>}
              <TouchableOpacity
                style={{
                  backgroundColor: '#007BFF',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => {
                  handleSaveToFavorites(item);
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save To Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#007BFF',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => {
                  handleRemoveFavorite(item);
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Remove from Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;
