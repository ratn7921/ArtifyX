import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../../services/GlobalApi';

const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = ({ message }) => <div>Error: {message}</div>;

const TabLayout = () => {
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User:", user);
    if (user?.primaryEmailAddress?.emailAddress) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, [user]);
  

  const verifyUser = async () => {
    setLoading(true);
    try {
      const result = await GlobalApi.GetUserInfo(user.primaryEmailAddress.emailAddress);
      console.log('API Result:', result); // Log the entire result
      if (!result || !result.data) throw new Error('No data received from API.');
      console.log('API Response:', result.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user info:', err.message || err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#000000',
            },
          }}
        >
          <Tabs.Screen 
            name="collection" 
            options={{ 
              title: 'Collection', 
              tabBarIcon: ({ color, size }) => <Ionicons name="folder-open-outline" size={size} color={color} /> 
            }} 
          />
          <Tabs.Screen 
            name="profile" 
            options={{ 
              title: 'Profile', 
              tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> 
            }} 
          />
          <Tabs.Screen 
            name="home" 
            options={{ 
              title: 'Home', 
              tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> 
            }} 
          />
        </Tabs>
      )}
    </>
  );
};

export default TabLayout;
