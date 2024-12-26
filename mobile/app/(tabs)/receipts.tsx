import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../utils/utils';
import { UserContext } from '../../context/UserContext';

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return '#2ecc71'; // Green
    case 'pending':
      return '#f39c12'; // Yellow
    case 'canceled':
      return '#e74c3c'; // Red
    default:
      return '#7f8c8d'; // Gray
  }
};

const Receipts = () => {
  const { id } = useContext(UserContext);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReceipts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/receipts?clientId=${id}`);
      const data = await response.json();
      setReceipts(data);
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, [id]);

  const renderReceipt = ({ item }) => (
    <View>
        <View style={styles.receiptContainer}>
          <Text style={styles.createdAt}>{new Date(item.created_at).toLocaleString()}</Text>
          <Text style={styles.bonusIncrement}>Бонусів отримано: {item.bonusIncrement}</Text>
          <Text style={styles.bonusIncrement}>Бонусів витрачено: {item.bonusUsed}</Text>
          <Text style={styles.productCount}>Кількість товарів: {item.productList.length}</Text>
          <Text style={styles.totalPrice}>Ціна: ${item.totalPrice}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Покупки</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={receipts}
          renderItem={renderReceipt}
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
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'left', 
  },
  receiptContainer: {
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
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  createdAt: {
    fontSize: 14,
    color: '#555',
  },
  bonusIncrement: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCount: {
    fontSize: 14,
    color: '#777',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Receipts;
