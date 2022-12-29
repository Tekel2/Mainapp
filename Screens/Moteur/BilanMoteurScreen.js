import React, { Component, useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/Authcontext';
import { baseUrlApi } from '../../API/urlbase';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
// import {LineChart} from 'react-native-charts-wrapper';


function BilanMoteurScreen ({route, navigation}) {


  const {userInfo,access_token} = useContext(AuthContext)
  
  
  const [data, setData] = useState({

  })

  const [isloading, setIsloading] = useState(false)




  const [modalvisibleccb, setmodalVisibleccb] = useState(false)
  const [modalvisiblecbb, setmodalVisiblecbb] = useState(false)
  const [modalvisiblecbm, setmodalVisiblecbm] = useState(false)
  const [modalvisiblect, setmodalVisiblect] = useState(false)
 

  const [HeadTable, setHeadTable] = useState(
    ['U1-U2', 'V1-V2', 'W1-W2', 'Date']

  )

  const [HeadTableTemperature, setHeadTableTemperature] = useState(
    ['Température en °C',  'Date']
  )

  const getBillanMoteur = async () => {
    setIsloading(true)
    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/billan/${moteurItem.moteur.id}/`, // Lien des planninig non executé
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      const data = await response.data
      // console.log("45654656  ",data)
      setData(data);
      // setFiltrerData(data);

         
      // console.log(json)
      console.log(response.status)
    } catch (error){
      console.log(error)
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Vous n'est pas authorisé")
      }
      else if (error.response?.status === 404){
        alert("Aucun planning de disponible")
      }
      // alert("An error has occurred");
      console.log(error.status)
      // setIsloading(false)
    }

    setIsloading(false)
  }

  const toggleModalCCB = () => {
    setmodalVisibleccb(!modalvisibleccb)
    console.log('btn courbe press '+ modalvisibleccb)
  }
  const toggleModalCBB = () => {
    setmodalVisiblecbb(!modalvisiblecbb)
    console.log('btn courbe press '+ modalvisiblecbb)
  }
  const toggleModalCBM = () => {
    setmodalVisiblecbm(!modalvisiblecbm)
    console.log('btn courbe press '+ modalvisiblecbm)
  }
  const toggleModalCT = () => {
    setmodalVisiblect(!modalvisiblect)
    console.log('btn courbe press '+ modalvisiblect)
  }

  const {moteurItem} = route.params


  useEffect(()=>{
    getBillanMoteur()
  },[])

  // useEffect(()=>{
  //   // console.log(data.continuite)
    
  // },[])

  const chatContinuit=()=>{
    const continuite_U = []
    // const continuite_V = []
    // const continuite_W = []
    const dateList = []
    for (let index_1=0; index_1 < data.continuite.length; index_1++){
        continuite_U.push(data.continuite[index_1][0])
        // continuite_V.push(data.continuite[index_1][1])
        // continuite_W.push(data.continuite[index_1][2])
        dateList.push(data.continuite[index_1][3])
    }
    const dataCHart = {
      labels: dateList,
      datasets: [
        {
          data: continuite_U,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Rainy Days"] // optional
    };

    // alert(dataCHart)

    return {
      labels: dateList,
      data: continuite_U,
    }
  }
  

    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{ flexDirection: 'column'}}>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
            </View>
        </View>


        <View style={{ flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{moteurItem.item_moteur}</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10 , 
                       }}>
            <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Dans l'atelier {data.atelier}</Text>
            <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Sur l'équiment {data.equipement}</Text>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={styles.etatprovenance}> NEUF</Text>
            <Text style={[styles.etatprovenance, {width: 200, marginLeft:15, color: '#000'}]}> RECONDITIONNé</Text>
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            {/* <Text style={styles.etatprovenance}> NEUF</Text> */}
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}> BILAN MOTEUR</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Date Installation</Text>
            <Text style={styles.txtdatachamp}>{data.dateInstall}</Text>
         </View>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Nombre Inter. Préventiven</Text>
            <Text style={styles.txtdatachamp}>{data.nbrePrev}</Text>
         </View>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Nombre Inter. Curative</Text>
            <Text style={styles.txtdatachamp}>{data.nbreCur}</Text>
         </View>
         {/* <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Temps de marche</Text>
            <Text style={styles.txtdatachamp}>---H</Text>
         </View> */}
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Couplage</Text>
            <Text style={styles.txtdatachamp}>{data.couplage}</Text>
         </View>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Dernière Inter. Curative</Text>
            <Text style={styles.txtdatachamp}>{data.dateLastCur}</Text>
         </View>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Dernière Inter. Préventive</Text>
            <Text style={styles.txtdatachamp}>{data.dateLastPrev}</Text>
         </View>
         <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.txtnomchamp}>Prochaine Intervention</Text>
            <Text style={styles.txtdatachamp}>{data.prochainInt}</Text>
         </View>

         <View style= {[styles.etatprovenance, {justifyContent: 'center', alignSelf: 'center',width: 250, marginLeft:15, color: '#000'}]}/>

         <View style={{flex:1, flexDirection: 'column', marginTop:15}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={styles.titrecourbe}>Continuité des bobinages en Ω</Text>
                <TouchableOpacity style={{flex:1, }}
                  onPress ={()=> {toggleModalCCB()}}
                >
                    <Text style={styles.btncourbe}>COURBE</Text>
                </TouchableOpacity>
            </View>
              <ScrollView style={[styles.container, styles.container__]}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#ED7524'}}>
                  <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                  <Rows data={data.continuite} textStyle={styles.TableText}/>
                </Table>
              </ScrollView>
          </View>


          <View style={styles.MainContainerModal}>
              
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalvisibleccb}
                style={{backgroundColor:'#fff'}}
              >
              <View  style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.titremodal}>Courbe Continuité 
                </Text>
                {/* <LineChart
                      data={{
                        // labels: chatContinuit.labels,
                        labels: ['tekeu', 'February', 'March', 'April'],
                        datasets: [
                          {
                            data: 
                             [
                              data.continuite[0][0],
                              data.continuite[1][0],
                              data.continuite[2][0],
                            ],
                          },
                        ],
                      }}
                      // data={{chatContinuit}}
                      width={Dimensions.get('window').width} // from react-native
                      height={220}
                      yAxisLabel={'U'}
                      chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 4,
                          marginLeft:10,
                          backgroundColor:'#fff'
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                          // backgroundColor:'#fff',
                        borderRadius: 16,
                      }}
                    /> */}
                
                <Pressable
                    style={{backgroundColor: '#fff'}}
                    onPress={()=>{toggleModalCCB()}}
                >
                    <Text style={styles.txtbtnmodal}>Fermer</Text>
                </Pressable>
              </View>

              </Modal>

          </View>

          <View style={{flex:1, flexDirection: 'column', marginTop:15}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={styles.titrecourbe}>Isolement entre bobines en MΩ</Text>
                <TouchableOpacity style={{flex:1, }}
                  onPress ={()=> {toggleModalCBB()}}
                >
                    <Text style={styles.btncourbe}>COURBE</Text>
                </TouchableOpacity>
            </View>
              <ScrollView style={[styles.container, styles.container__]}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#ED7524'}}>
                  <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                  <Rows data={data.bobine_isol} textStyle={styles.TableText}/>
                </Table>
              </ScrollView>
          </View>

          <View style={styles.MainContainerModal}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalvisiblecbb}
              >
              <View  style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.titremodal}>Courbe
                </Text>
                <Text style={styles.testcontentmodal}>
                  Isolement entre bobines en MΩ
                </Text>
                
                <Pressable
                    style={{backgroundColor: '#fff'}}
                    onPress={()=>{toggleModalCBB()}}
                >
                    <Text style={styles.txtbtnmodal}>Fermer</Text>
                </Pressable>
              </View>
              </Modal>
          </View>

          <View style={{flex:1, flexDirection: 'column', marginTop:15}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={[styles.titrecourbe, ]}>Isolement entre les bobines et la masse MΩ</Text>
                <TouchableOpacity style={{flex:1, }}
                  onPress ={()=> {toggleModalCBM()}}
                >
                    <Text style={styles.btncourbe}>COURBE</Text>
                </TouchableOpacity>
            </View>
              <ScrollView style={[styles.container, styles.container__]}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#ED7524'}}>
                  <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                  <Rows data={data.bobine_isol_m} textStyle={styles.TableText}/>
                </Table>
              </ScrollView>
          </View>
          <View style={styles.MainContainerModal}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalvisiblecbm}
              >
              <View  style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.titremodal}>Courbe
                </Text>
                <Text style={styles.testcontentmodal}>
                    Isolement entre les bobines et la masse MΩ
                </Text>
                
                <Pressable
                    style={{backgroundColor: '#fff'}}
                    onPress={()=>{toggleModalCBM()}}
                >
                    <Text style={styles.txtbtnmodal}>Fermer</Text>
                </Pressable>
              </View>
              </Modal>
          </View>

          <View style={{flex:1, flexDirection: 'column', marginTop:15}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={styles.titrecourbe}>Evolution de la température</Text>
                <TouchableOpacity style={{flex:1, }}
                  onPress ={()=> {toggleModalCT()}}
                >
                    <Text style={styles.btncourbe}>COURBE</Text>
                </TouchableOpacity>
            </View>
              <ScrollView style={[styles.container, styles.container__]}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#ED7524'}}>
                  <Row data={HeadTableTemperature} style={styles.HeadStyle} textStyle={styles.TableText}/>
                  <Rows data={data.temperature} textStyle={styles.TableText}/>
                </Table>
              </ScrollView>
          </View>
          <View style={styles.MainContainerModal}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalvisiblect}
              >
              <View  style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.titremodal}>Courbe
                </Text>
                <Text style={styles.testcontentmodal}>
                  Evolution de la température
                </Text>
                
                <Pressable
                    style={{backgroundColor: '#fff'}}
                    onPress={()=>{toggleModalCT()}}
                >
                    <Text style={styles.txtbtnmodal}>Fermer</Text>
                </Pressable>
              </View>
              </Modal>
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
    titrecourbe:{
      flex:2.1,
      fontSize: 18, 
      fontWeight:'900', 
      textAlign:'left',
      paddingTop: 5,
      paddingBottom:5,
      color: '#000'
    },
    btncourbe:{
      flex:1, 
      marginLeft: 10, 
      textAlign:'center',
      fontSize: 20,
      color:'#316094',
      fontWeight: 'bold',
      paddingTop:5, 
      paddingBottom:5,
      backgroundColor: '#ED7524',
      borderRadius: 22,
      height:35,
    },

    container: { 
      flex: 1,
      // padding: 10,
      paddingRight: 5,
      backgroundColor: '#E4E4E4' 
    },
    container__:{
      marginTop: 10, 
      height:150, 
      borderWidth: 1, 
      borderColor: '#ED7524'
    },
   
    HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0',
      
    },
    TableText: { 
      margin: 5,
      textAlign:'center',
      fontSize: 15
      
    },
    MainContainerModal:{flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
      },
    titremodal:{
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'left',
      backgroundColor: '#fff',
      color: '#316094',
      paddingTop: 10,
      paddingLeft: 20, 
      borderTopRightRadius: 4,
      borderTopLeftRadius:4,
      height: 100,
    },
    testcontentmodal:{
      height:100, 
      backgroundColor: '#fff',
      // borderRadius: 4,
      color: '#000',
      textAlign: 'center',
      fontWeight: '300',
      fontSize: 18,
      paddingTop:10,
      paddingLeft: 8,
      paddingRight: 8
  },
  txtbtnmodal:{
      height: 30,
      color:'#316094',
      fontSize:20,
      fontWeight: '900' ,
      textAlign: 'right',
      marginBottom: 20,
      paddingRight:20,
      marginRight:10,
      borderBottomLeftRadius:4,
      borderBottomLeftRadius:4,
      marginBottom: 5
  }

   
   
  });

export default BilanMoteurScreen;