
import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
// import CustomButton from '../utils/CustomButton';
import RNFS from 'react-native-fs';
// import { setPreventive } from '../Reduxe/action';
import { setPreventive } from '../Reduxe/action';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




 const  Camera =({navigation, route}) =>{

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const {preventive, preventiveID} = useSelector(state => state.preventiveReducer);
    const dispatch = useDispatch()

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            // console.log(data);
            const filePath = data.uri;
            // const newFilePath = RNFS.ExternalDirectoryPath + '/capsule.jpg';
            updatePreventive(route.params.id, filePath)
            
        } catch (error) {
            console.log(error);
        }
    }

    const updatePreventive=(id, path)=>{
        const index =preventive.findIndex(prev=>prev.ID === id)
        if (index > -1){
            let newPreventive =[...preventive]
            newPreventive[index].Image = path
            AsyncStorage.setItem('Preventive', JSON.stringify(newPreventive) )
            .then(()=>{
                dispatch(setPreventive(newPreventive))
                Alert.alert('Success!', 'Image sauvegardée')
                navigation.goBack()
            })
            .catch(err => console.log(err))
        }
        else{
            console.log(preventive)
        }
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
                {/* <CustomButton
                    title="Capture"
                    color='#1eb900'
                    onPressFunction={() => captureHandle()}
                /> */}
                <TouchableOpacity
                style={{marginBottom:20}}
                    onPress={()=> captureHandle()}
                >
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_camera.png")}/>

                </TouchableOpacity>
            </RNCamera>
        </View>
    );
}

export default  Camera;

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});