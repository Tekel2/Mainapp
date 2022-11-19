import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from 'expo-checkbox';


function Form_Inter_Cur_Screen (props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [data, setData] = React.useState({
    obsevervation_gene_av: '',
    obsevervation_gene_ap: '',
    descriptionpanne: '',
    continuite_U1_U2: 0.0,
    continuite_V1_V2: 0.0,
    continuite_W1_W2: 0.0,
    isolementbobine_W2_U2: 0.0,
    isolementbobine_W2_V2: 0.0,
    isolementbobine_U1_V2: 0.0,
    isolementbobinemasse_U1_M: 0.0,
    isolementbobinemasse_V1_M: 0.0,
    isolementbobinemasse_W1_M: 0.0,
    proposition: '',
    temperature: 0.0,



    // secureTextEntry: true,
    // isValidUser: true,
    // isValidPassword: true,
});

const handle_Obsevervation_gene_av = (val) => {
  if( val.trim().length >= 3 ) {
      setData({
          ...data,
          obsevervation_gene_av: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_gene_av: val,
      });
  }
}
const handle_Obsevervation_gene_ap = (val) => {
  if( val.trim().length >= 3 ) {
      setData({
          ...data,
          obsevervation_gene_ap: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_gene_ap: val,
      });
  }
}
const handle_Descriptionpanne = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          descriptionpanne: val,
      });
  } else {
      setData({
          ...data,
          descriptionpanne: val,
      });
  }
}
const handle_Continuite_U1_U2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          continuite_U1_U2: val,
      });
  } else {
      setData({
          ...data,
          continuite_U1_U2: val,
      });
  }
}
const handle_Continuite_V1_V2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          continuite_V1_V2: val,
      });
  } else {
      setData({
          ...data,
          continuite_V1_V2: val,
      });
  }
}
const handle_Continuite_W1_W2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          continuite_W1_W2: val,
      });
  } else {
      setData({
          ...data,
          continuite_W1_W2: val,
      });
  }
}
const handle_Isolementbobine_W2_U2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobine_W2_U2: val,
      });
  } else {
      setData({
          ...data,
          isolementbobine_W2_U2: val,
      });
  }
}
const handle_Isolementbobine_W2_V2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobine_W2_V2: val,
      });
  } else {
      setData({
          ...data,
          isolementbobine_W2_V2: val,
      });
  }
}
const handle_Isolementbobine_U1_V2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobine_U1_V2: val,
      });
  } else {
      setData({
          ...data,
          isolementbobine_U1_V2: val,
      });
  }
}
const handle_Isolementbobinemasse_U1_M = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobinemasse_U1_M: val,
      });
  } else {
      setData({
          ...data,
          isolementbobinemasse_U1_M: val,
      });
  }
}
const handle_Isolementbobinemasse_V1_M = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobinemasse_V1_M: val,
      });
  } else {
      setData({
          ...data,
          isolementbobinemasse_V1_M: val,
      });
  }
}
const handle_Isolementbobinemasse_W1_M = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          isolementbobinemasse_W1_M: val,
      });
  } else {
      setData({
          ...data,
          isolementbobinemasse_W1_M: val,
      });
  }
}
const handle_Proposition = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          proposition: val,
      });
  } else {
      setData({
          ...data,
          proposition: val,
      });
  }
}
const handle_Temperature = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          temperature: val,
      });
  } else {
      setData({
          ...data,
          temperature: val,
      });
  }
}

const saveDatatoServer = (data) => {
  console.log(data)
}

    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{ flexDirection: 'column'}}>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
            </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>5JM11-65468</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10 , 
                       }}>
            <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Dans l'atelier SECHEUR</Text>
            <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Sur l'équiment COMPRESSEUR</Text>
          </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>INTERVENTION CURATIVE</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Observation Général avant</Text>
            <TextInput
                  placeholder="Notez ici toutes vos observations avant tout action"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  numberOfLines={7}
                  multiline={true}
                  
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handle_Obsevervation_gene_av(val)}

              />              
          </View>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Description de la panne</Text>
            <TextInput
                  placeholder="Notez ici une description de la panne"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  numberOfLines={7}
                  multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handle_Descriptionpanne(val)}

              />              
          </View>

          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Continuité des enroulements</Text>
            <View style={{flex:1, flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}> U1 - U2</Text>
                        <TextInput
                          placeholder="Ohm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Continuite_U1_U2(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>V1 - V2</Text>
                        <TextInput
                          placeholder="Ohm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Continuite_V1_V2(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>W1 - W2</Text>
                        <TextInput
                          placeholder="Ohm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Continuite_W1_W2(val)}
                        />  
                   </View>    
            </View>
                      
          </View>

          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Isolement entre bobine</Text>
            <View style={{flex:1, flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}> W2 - U2</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobine_W2_U2(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>W2 - V2</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobine_W2_V2(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>U2 - V2</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobine_U1_V2(val)}
                        />  
                   </View>    
            </View>
                      
          </View>

          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Isolement entre les bobines et la masse</Text>
            <View style={{flex:1, flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}> U1 - M</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobinemasse_U1_M(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>V1 - M</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobinemasse_V1_M(val)}
                        />  
                   </View>  
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}>W1 - M</Text>
                        <TextInput
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobinemasse_W1_M(val)}
                        />  
                   </View>    
            </View>
                      
          </View>

          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Température</Text>
              <TextInput
                placeholder="°C"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                keyboardType='decimal-pad'
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_Temperature(val)}
              />  
          </View>

          <View style={{flex:1,marginTop:20}}>
            <Text style={styles.titrechamp}>Observation général Après</Text>
            <TextInput
                  placeholder="Notez ici vos observations"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  numberOfLines={7}
                  multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Obsevervation_gene_ap(val)}

              />              
          </View>

          <View style={{flex:1,}}>
            <Text style={styles.titrechamp}>Proposition</Text>
            <TextInput
                  placeholder="Notez ici vos propositions"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  numberOfLines={7}
                  multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Proposition(val)}

              />              
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}              
              onPress={() => {saveDatatoServer( data )}}
              >
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/enregistrer.png")}/>
            </TouchableOpacity>
           
          </View>
          
        </ScrollView>
           

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: '#E4E4E4',
      paddingTop: 10,
      paddingLeft: 10, 
      paddingRight: 10,
      paddingBottom: 10,
      justifyContent: 'center',
      alignContent:'center',
    },
    etatprovenance:{
        fontSize: 20, 
        color: '#111', 
        fontWeight: 'bold',
        borderBottomWidth: 1.5,
        borderRadius: 6,
        borderColor:'#ED7524',
        width: 88,
        textAlign: 'center',
        padding: 6,
        // backgroundColor: '#ED7524',
        color: '#fff'

    },
    cat:{
        justifyContent: 'center', 
        alignSelf: 'center',
        width:300,
        backgroundColor: 'rgba(49, 96, 148, 0.37)',
        borderRadius:4,
        marginTop: 5

    },
    txtnomchamp:{
      flex:2,  
      color: '#000', 
      fontSize: 16,
      fontWeight: '500',
      flexWrap: 'wrap',
      padding: 2
    },
    txtdatachamp:{
      flex:1.5,
      marginLeft:15,
      color: '#000', 
      fontSize: 18,
      flexWrap:'wrap',
      padding: 2,
      fontWeight: '900',
    },
    titrechamp:{
      fontSize: 20,
      color: '#000'
      // marginLeft:5,
    },
    textinput: {
      borderColor: '#ddd',
      marginLeft: 5,
      fontSize: 18,
      color: '#1B2F70',
      padding: 5,
      borderColor: '#1B2F70',
      borderWidth: 1, borderRadius:4,
      backgroundColor:'#eee', 
    },
    textinputmulti:{
      marginBottom: 30, 
      textAlignVertical: 'top', 
      fontSize: 16, 
      backgroundColor:'#eee', 
      fontSize: 18,
      padding:5,
      }
  
    

   
   
  });

export default Form_Inter_Cur_Screen;