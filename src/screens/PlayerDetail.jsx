import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';

const PlayerDetail = () => {
  const route = useRoute();
  const params = route.params;
  const player = params?.player;

  const [isFavorite, setIsFavorite] = useState(player?.isFavorite || false);

  const handleSaveRemoveFavorite = async () => {
    if (isFavorite) {
      const favoritePlayers = await AsyncStorage.getItem('favoritePlayers');
      const parsedFavorites = favoritePlayers ? JSON.parse(favoritePlayers) : [];
      const newFavorites = parsedFavorites.filter((p) => p.id !== player.id);
      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      const favoritePlayers = await AsyncStorage.getItem('favoritePlayers');
      const parsedFavorites = favoritePlayers ? JSON.parse(favoritePlayers) : [];
      const newFavoriteList = [...parsedFavorites, player];
      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavoriteList));
      setIsFavorite(true);
    }
  };

  if (!player) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: player.image }} style={styles.playerImage} />
        <Text style={styles.playerName}>{player.playerName}</Text>
        {player.isCaptain && <Text style={styles.captainTag}>Captain</Text>}
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>Player Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Team:</Text>
          <Text style={styles.detailValue}>{player.team}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Position:</Text>
          <Text style={styles.detailValue}>{player.position}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Minutes Played:</Text>
          <Text style={styles.detailValue}>{player.MinutesPlayed}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Year of Birth:</Text>
          <Text style={styles.detailValue}>{player.YoB}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Passing Accuracy:</Text>
          <Text style={styles.detailValue}>{(player.PassingAccuracy * 100).toFixed(1)}%</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: isFavorite ? '#f00' : '#007bff',
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            handleSaveRemoveFavorite();
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>{isFavorite ? 'Remove from Favorites' : 'Save To Favorites'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  captainTag: {
    backgroundColor: '#ffc107',
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default PlayerDetail;
