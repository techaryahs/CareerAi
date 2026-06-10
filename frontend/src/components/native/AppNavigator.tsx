import React from 'react';
import { 
  createNativeStackNavigator, 
  NativeStackNavigationOptions 
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';

// Screen imports (mock references for types and structure)
import HomeScreen from '../../pages/Home';

export type RootStackParamList = {
  Home: undefined;
  CareerJourney: undefined;
  CareerDetail: { careerId: string };
  Profile: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const commonScreenOptions: NativeStackNavigationOptions = {
    // Globally disable native headers to avoid double-header conflicts
    headerShown: false,
    contentStyle: {
      backgroundColor: '#f8fafc', // Premium slate background bleeds edge-to-edge
    },
    // Premium transitions matching native app feel
    animation: Platform.select({
      ios: 'slide_from_right',
      android: 'slide_from_right',
      default: 'fade',
    }),
  };

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      {/* Root Landing Screen */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen as any} 
      />

      {/* Career Detail Screen */}
      <Stack.Screen 
        name="CareerDetail" 
        component={HomeScreen as any} // Reusing mock component reference
      />
    </Stack.Navigator>
  );
}
