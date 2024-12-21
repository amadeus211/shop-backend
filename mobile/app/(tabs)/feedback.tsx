import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard} from 'react-native';
import { UserContext } from '../../context/UserContext'; 
import { BASE_URL } from '../utils/utils';

const Feedback = () => {
  const [description, setDescription] = useState('');
  const { phoneNumber } = useContext(UserContext);

  const handleSendFeedback = async () => {
    Keyboard.dismiss();
    if (!description.trim()) {
      Alert.alert('Помилка', 'Введіть текст відгуку.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка відправлення відгуку.');
      }

      Alert.alert('Успішно', 'Ваш відгук надіслано!');
      setDescription('');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відгук</Text>
      <TextInput
        style={styles.input}
        placeholder="Напишіть ваш відгук..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Відправити" onPress={handleSendFeedback} />
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
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100, 
  },
});

export default Feedback;
