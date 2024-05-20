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
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: { 
    home: 'Home',
    settings: 'Settings',
    newEvent: 'New Event',
  },
  de: {
    home: 'Home',
    settings: 'Einstellungen',
    newEvent: 'Neuer Termin',
  }
});

i18n.locale = getLocales()[0].languageCode;

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
                  case i18n.t('home'):
                    iconName = 'home-outline';
                    break;
                  case i18n.t('settings'):
                    iconName = 'settings-outline';
                    break;
                  case i18n.t('newEvent'):
                    iconName = 'add-circle-outline';
                    break;
                  default:
                    iconName = 'ellipse-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name={i18n.t('home')} component={HomeScreen} />
            <Tab.Screen name={i18n.t('newEvent')} component={CreateNip52Screen} />
            <Tab.Screen name={i18n.t('settings')} component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Nip07Provider>
    </NativeBaseProvider>
  );
};

export default App;
