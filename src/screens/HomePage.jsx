import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useAppContext } from '../provider/AppProvider';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API } from '@env';

const HomePage = () => {
  const navigation = useNavigation();
  const { products, brands, chosenBrand, setChosenBrand } = useAppContext();

  if (!products || !brands) return;

  const filteredProducts = products?.filter((product) => chosenBrand === 'All' || product.brand === chosenBrand);

  const handleSaveToFavorites = async (item) => {
    // save to async storage or API
    const existingData = await AsyncStorage.getItem('favorites_products');
    const favorites = existingData ? JSON.parse(existingData) : [];

    const isAlreadyFavorite = favorites.some((favorite) => favorite.id === item.id);

    if (isAlreadyFavorite) {
      Alert.alert('Info', 'Product is already in favorites!');
      return;
    }

    favorites.push(item);

    await AsyncStorage.setItem('favorites_products', JSON.stringify(favorites));
    Alert.alert('Success', 'Product saved to favorites!');
  };

  const handleNavigateToProductDetail = (item) => {
    navigation.navigate('ProductDetail', { product: item });
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
        {API}
      </Text>

      <View>
        {brands.map((brand) => (
          <TouchableOpacity>
            <Text
              key={brand}
              style={{
                fontSize: 16,
                padding: 10,
                backgroundColor: chosenBrand === brand ? '#ddd' : '#fff',
                borderRadius: 5,
                marginVertical: 5,
              }}
              onPress={() => setChosenBrand(brand)}
            >
              {brand}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity>
          <Text
            key={'All'}
            style={{
              fontSize: 16,
              padding: 10,
              backgroundColor: chosenBrand === 'All' ? '#ddd' : '#fff',
              borderRadius: 5,
              marginVertical: 5,
            }}
            onPress={() => setChosenBrand('All')}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
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
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomePage;
