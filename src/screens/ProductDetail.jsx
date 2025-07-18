import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = () => {
  const route = useRoute();
  const product = route.params?.product;

  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const { jeName, color, percentOff, image, shipped, cost, material, brand, stoneStyle } = product;

  const shippedVND = shipped === 0 ? 'Freeship' : `${(shipped * 25000).toLocaleString()} VND`;
  const costVND = (cost * 25000).toLocaleString();
  const priceVND = ((cost + shipped) * 25000).toLocaleString();
  const titleColor = color?.[0]?.toLowerCase() || 'black';
  const percentOffDisplay = `${(percentOff * 100).toFixed(0)}% OFF`;

  const toggleFavorite = async () => {
    const existingData = await AsyncStorage.getItem('favorites_products');
    const favorites = existingData ? JSON.parse(existingData) : [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.id !== product.id);
      await AsyncStorage.setItem('favorites_products', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(product);
      await AsyncStorage.setItem('favorites_products', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await AsyncStorage.getItem('favorites_products');
      const favoritesArray = favorites ? JSON.parse(favorites) : [];

      const isFavorite = Boolean(favoritesArray.some((item) => item.id === product.id));

      setIsFavorite(isFavorite);
    };
    checkFavorite();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: titleColor }]}>{jeName}</Text>
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />

      <View style={styles.infoBox}>
        <Text style={styles.label}>Brand:</Text>
        <Text style={styles.value}>{brand}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Material:</Text>
        <Text style={styles.value}>{material}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Color:</Text>
        <Text style={styles.value}>{color.join(', ')}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Percent Off:</Text>
        <Text style={styles.value}>{percentOffDisplay}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Shipped:</Text>
        <Text style={styles.value}>{shippedVND}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>{costVND} VND</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{priceVND} VND</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Stone Style:</Text>
        <Text style={styles.value}>{stoneStyle ? '⭐' : 'No Stone'}</Text>
      </View>

      <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'} Favorite</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  infoBox: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
  value: {
    fontSize: 15,
    color: '#555',
  },
  favoriteBtn: {
    marginTop: 25,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  favoriteIcon: {
    fontSize: 18,
  },
});

export default ProductDetail;
