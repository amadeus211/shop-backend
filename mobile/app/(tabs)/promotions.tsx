import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const fetchPromotions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/promotions');
      const data = await response.json();
      setPromotions(data); 
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Рендеринг кожної акції
  const renderPromotion = ({ item }) => (
    <View style={styles.promotionContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> 
      ) : (
        <FlatList
          data={promotions} 
          renderItem={renderPromotion} 
          keyExtractor={(item) => item._id} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    padding: 10,
  },
  promotionContainer: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },
  status: {
    color: 'lightgreen',
    fontSize: 12,
  },
});

export default Promotions;