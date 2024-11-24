import { Tabs } from "expo-router";
import { MaterialIcons } from 'react-native-vector-icons';  

export default () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="promotions"  
        options={{ 
          headerShown: false, 
          tabBarLabel: "Акції", 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-offer" size={size} color={color} />  
          ),
          tabBarStyle: { backgroundColor: 'black' },  
          tabBarLabelStyle: { color: 'white' },  
        }} 
      />
      <Tabs.Screen 
        name="barcode"  
        options={{ 
          headerShown: false, 
          tabBarLabel: "Штрих-код", 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="scanner" size={size} color={color} />  
          ),
          tabBarStyle: { backgroundColor: 'black' },  
          tabBarLabelStyle: { color: 'white' },  
        }} 
      />
      <Tabs.Screen 
        name="feedback"  
        options={{ 
          headerShown: false, 
          tabBarLabel: "Відгук", 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="feedback" size={size} color={color} /> 
          ),
          tabBarStyle: { backgroundColor: 'black' }, 
          tabBarLabelStyle: { color: 'white' },  
        }} 
      />
    </Tabs>
  );
};
