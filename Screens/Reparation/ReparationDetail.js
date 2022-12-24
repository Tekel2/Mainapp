import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';



const ReparationDetail = ({navigation}) => {


  const [data, setData] = React.useState({
    
  });

 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
            <StatusBar backgroundColor='#316094' barStyle='light-content'/>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
            </View>
            <ScrollView style={{flex:1, flexDirection:'column'}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View >
                        <Text style={{flexWrap:'wrap', fontWeight: 'bold', fontSize:20, color:'#0A233E'}}>
                        Détail moteur en réparation</Text>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Réparation</Text>
                        </View>
                       <View style={{flex:2, marginLeft:10}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>21409386</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Préstatiare</Text>
                        </View>
                       <View style={{flex:2, marginLeft:10}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>IDE</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Superviseur</Text>
                        </View>
                       <View style={{flex:2, marginLeft:10}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>TEKEU Bleck</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif</Text>
                        </View>
                       <View style={{flex:2, marginLeft:10}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> Effectuer une visite sur site pour une meilleure compréhension des opérations (la visite prévue ci-dessus est effectué avec l’ensemble des EPIs obligatoire : casque, lunette de sécurité et des sur lunettes pour ceux qui ont déjà des lunettes médicales, la tenue de travail, les chaussures de sécurité. Il faut également prévoir un casque antibruit ou des bouchons d’oreilles).</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Dernier Technicien</Text>
                        </View>
                       <View style={{flex:2,marginLeft:10}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>TEKEU Bleck</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Moteur</Text>
                        </View>
                       <View style={{flex:2,}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>12009386</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date Création</Text>
                        </View>
                       <View style={{flex:2}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date modification</Text>
                        </View>
                       <View style={{flex:2}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{flexWrap:'wrap', fontWeight: '400', fontSize:18, color:'#000'}}>Démonter à :</Text>
                    </View>
                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Atelier</Text>
                        </View>
                       <View style={{flex:2}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Equipement</Text>
                        </View>
                       <View style={{flex:2}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>
                    
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
      paddingRight: 10
    },
   
   
  });

export default ReparationDetail;