import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../../context/UserContext';
import Barcode from 'react-native-barcode-svg'; 
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: Barcode: Support for defaultProps']);


const BarcodeScreen = () => {
  const { id, phoneNumber, bonus, name } = useContext(UserContext);
  const [clientData, setClientData] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://192.168.0.104:5001/api/clients/${id}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження даних клієнта');
        }
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        Alert.alert('Помилка', error.message);
      }
    };

    fetchClientData();
  }, [id]);

  useEffect(() => {
    if (clientData) {
      const barcodeData = `${clientData.name} ${clientData.phoneNumber} ${clientData.bonusPoints}`;
      setBarcodeValue(barcodeData);
    }
  }, [clientData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Проскануйте штрих-код</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Ім'я: {clientData ? clientData.name : name}</Text>
        <Text style={styles.text}>Номер телефону: {clientData ? clientData.phoneNumber : phoneNumber}</Text>
        <Text style={styles.text}>Бонуси: {clientData ? clientData.bonusPoints : bonus}</Text>

        <View style={styles.barcodeContainer}>
          {barcodeValue ? (
            <Barcode value={barcodeValue} format="CODE128" maxWidth={350} height={100} />
          ) : (
            <Text style={styles.text}>Завантаження даних...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    paddingTop: 60

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    justifyContent: 'center',  
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center', 
  },
  barcodeContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeScreen;
