import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/build/Feather';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarItemStyle: {
          marginTop: Platform.OS === 'ios' ? 10 : 0,
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 100,
          },
          default: {
          },
        }),

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="find"
        options={{
          title: 'Find',
          tabBarIcon: ({ color }) => <Feather name="map" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="treasure-chest" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="couch"
        options={{
          title: 'Coach',
          tabBarIcon: ({ color }) => <Ionicons name="fish-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
