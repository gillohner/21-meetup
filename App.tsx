// App.tsx
import 'fast-text-encoding';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import customTheme from './theme';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreateNip52Screen from './screens/CreateNip52Screen';
import { Nip07Provider } from './Nip07Context';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Nip07Provider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Home':
                    iconName = 'home-outline';
                    break;
                  case 'Settings':
                    iconName = 'settings-outline';
                    break;
                  case 'New Event':
                    iconName = 'add-circle-outline';
                    break;
                  default:
                    iconName = 'ellipse-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="New Event" component={CreateNip52Screen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Nip07Provider>
    </NativeBaseProvider>
  );
};

export default App;
