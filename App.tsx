import 'fast-text-encoding';
import React from 'react';
import { NativeBaseProvider, StorageManager, ColorMode, Box, HStack, Text, StatusBar, useColorModeValue } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreateNip52Screen from './screens/CreateNip52Screen';
import { Nip07Provider } from './Nip07Context';
import * as Localization from 'expo-localization';
import * as Linking from 'expo-linking';
import { I18n } from 'i18n-js';
import en from './translations/en.json';
import de from './translations/de.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

// Translation setup
const translations = {
  en: en,
  de: de
};
export const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const Tab = createBottomTabNavigator();

// Define the colorModeManager
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

// Custom header component
const AppHeader = () => {
  const bgColor = useColorModeValue("white", "coolGray.900");
  const textColor = useColorModeValue("coolGray.800", "coolGray.50");

  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle={useColorModeValue("dark-content", "light-content")} />
      <Box safeAreaTop bg={bgColor} />
      <HStack bg={bgColor} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <Text color={textColor} fontSize="20" fontWeight="bold">
            21-meetup
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

const App = () => {  
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const linking = {
    prefixes: [Linking.createURL('/'), '21-meetup://'],
    config: {
      screens: {
        [i18n.t('home')]: {
          path: 'home',
        },
        [i18n.t('newEvent')]: {
          path: 'new-event',
        },
        [i18n.t('settings')]: {
          path: 'settings',
        },
      },
    },
  };
  
  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Nip07Provider>
        <NavigationContainer
          linking={linking}
          initialState={initialState}
          onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
        >
          <AppHeader />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case i18n.t('home'):
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case i18n.t('settings'):
                    iconName = focused ? 'settings' : 'settings-outline';
                    break;
                  case i18n.t('newEvent'):
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                    break;
                  default:
                    iconName = 'ellipse-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: useColorModeValue("white", "coolGray.900"),
                borderTopColor: useColorModeValue("coolGray.200", "coolGray.700"),
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
