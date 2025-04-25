import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';
import FarmersDashboard from './screens/farmers/FarmersDashboard';
import ForumsScreen from './screens/farmers/FarmersForum';
import LoginScreen from './screens/LoginScreen';
import RestaurantsDashboard from './screens/Restaurants/RestaurantsDashboard';
import RegisterScreen from './screens/RegisterScreen';
import FoodFridges from './screens/FoodFridges/FoodFridges';
import VolunteerDashboard from './screens/volunteer/VolunteerDashboard';
import Leaderboard from './screens/Restaurants/Leaderboard';
import Notification from './screens/Restaurants/Notification';
import Statistics from './screens/Restaurants/Statistics';
import EmergencyAlerts from './screens/oldage/EmergencyAlerts';
import RealTimeFoodTracking from './screens/RealTimeFoodTracking';
import DisasterRelief from './screens/DisasterRelief';
import HomePage from './screens/Restaurants/HomePage';
import { AuthProvider } from './context/AuthContext';
import PurchaseDetails from './screens/farmers/PurchaseDetails';
import OldAgeHomesDashboard from './screens/oldage/Oldage';
import Quality from './screens/oldage/Quality';
import './i18n';
import RoleSelectionScreen from './screens/RoleSelectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen options={{
    headerShown: false,
  }} name="LandingPage" component={LandingPage} />
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/> */}
        <Stack.Screen name='RoleSelectionPage' component={RoleSelectionScreen}/>
        <Stack.Screen name='RestaurantsDashboard' component={RestaurantsDashboard}/>
        <Stack.Screen name="FoodFridges" component={FoodFridges}/>
        <Stack.Screen name="VolunteerDashboard" component={VolunteerDashboard}/>
        <Stack.Screen name="EmergencyAlerts" component={EmergencyAlerts}/>
        <Stack.Screen name='RestaurnatsLeaderboard' component={Leaderboard}/>
        <Stack.Screen name='RestaurnatsNotification' component={Notification}/>
        <Stack.Screen name='RestaurnatsStatistics' component={Statistics}/>
        <Stack.Screen name="RealTimeFoodTracking" component={RealTimeFoodTracking} />
        <Stack.Screen name="DisasterRelief" component={DisasterRelief} />
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen options={{
    headerShown: false,
  }} name="FarmersDashboard" component={FarmersDashboard}/>
        <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
        <Stack.Screen name="Oldage" component={OldAgeHomesDashboard} />
        <Stack.Screen name="Quality" component={Quality} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
