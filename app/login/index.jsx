import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors'; // Ensure this is defined
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        // setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  const handleContinue = () => {
    // Add your navigation logic here
    console.log('Continue pressed');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/images/image_processing20210910-23638-14qp9kg.gif')} 
        style={styles.backgroundImage}
      />
      
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome to ArtifyX</Text>
        <Text style={styles.slogan}>ArtifyX: Your Canvas, Your Vision, Your Art.</Text>
        
        {/* <TouchableOpacity  style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>   
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
  <Text style={styles.buttonText}>Continue</Text>   
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 650,
    zIndex: -1,
  },
  loginContainer: {
    padding: 25,
    marginTop: 'auto',
    backgroundColor: 'white',
    height: 300,
    width: '90%', // Adjust width to 90% for better aesthetics
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slogan: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: Colors.GRAY,
  },
  button: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.PRIMARY, // This will appear white
    borderRadius: 40,
    alignItems: 'center', // Center the text within the button
    marginTop: 20, // Add margin to separate from slogan
    shadowColor: '#000', // Optional: Add shadow to the button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: Colors.GRAY, // This is the color defined in your Colors file
    fontWeight: 'bold',
  },
});
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()






// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import React from 'react';
// import Colors from './../../constants/Colors'; // Ensure this is defined
// import { useOAuth } from '@clerk/clerk-expo';
// import * as Linking from 'expo-linking';
// import * as WebBrowser from 'expo-web-browser';

// export default function LoginScreen() {
//   useWarmUpBrowser();
//   const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId } = await startOAuthFlow({
//         redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
//       });

//       if (createdSessionId) {
//         console.log('Session created:', createdSessionId);
//         // Add your navigation logic here, e.g., navigate to dashboard
//       } else {
//         console.log('No session created, handle signIn or signUp');
//       }
//     } catch (err) {
//       console.error('OAuth error', err);
//     }
//   }, [startOAuthFlow]);

//   return (
//     <View style={styles.container}>
//       <Image 
//         source={require('./../../assets/images/image_processing20210910-23638-14qp9kg.gif')} 
//         style={styles.backgroundImage}
//       />
      
//       <View style={styles.loginContainer}>
//         <Text style={styles.welcomeText}>Welcome to ArtifyX</Text>
//         <Text style={styles.slogan}>ArtifyX: Your Canvas, Your Vision, Your Art.</Text>
        
//         <TouchableOpacity style={styles.button} onPress={onPress}>
//           <Text style={styles.buttonText}>Continue</Text>   
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backgroundImage: {
//     width: '100%',
//     height: 650,
//     zIndex: -1,
//   },
//   loginContainer: {
//     padding: 25,
//     marginTop: 'auto',
//     backgroundColor: 'white',
//     height: 300,
//     width: '90%', 
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     zIndex: 1,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   slogan: {
//     fontSize: 14,
//     textAlign: 'center',
//     marginTop: 10,
//     color: Colors.GRAY,
//   },
//   button: {
//     width: '100%',
//     padding: 20,
//     backgroundColor: Colors.PRIMARY,
//     borderRadius: 40,
//     alignItems: 'center',
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: 'black', // Change to black for better visibility against the white background
//     fontWeight: 'bold',
//   },
// });

// export const useWarmUpBrowser = () => {
//   React.useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// }

// WebBrowser.maybeCompleteAuthSession();
