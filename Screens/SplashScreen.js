import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
    setTimeout(() =>{
        // this.props.navigation.navigate('Home')
        navigation.navigate('Home')
      }, 3000);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    source={require('./sources/assets/images/logo_X1.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            {/* <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"

                
            >
                <Text style={styles.title}>Stey connected with everyone</Text>
                <Text style={styles.text}>Sign In with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity 
                        style={[styles.buttonstarted, {flexDirection: 'row'}]}
                        onPress={()=>navigation.navigate('HomeScreen')}>
                    
                        <Text style={styles.buttonstartedtext}>Get Started</Text>
                        <MaterialIcons
                            name="navigate-next"
                            color="#fff"
                            size={24}
                            
                        />
                    </TouchableOpacity>
                </View>
            </Animatable.View> */}
        </View>
    )
}
export default SplashScreen

const {height} = Dimensions.get("screen");
const height_logo = height * 0.22;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#E4E4E4'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderBottomRightRadius: 210,
      //borderTopLeftRadius: -210,
      borderTopRightRadius: 210,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: 240,
      height: 150
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30,
      
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  buttonstarted:{
    backgroundColor: '#1B2F70',
    borderRadius:32, 
    height:50,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonstartedtext:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17
  }
});