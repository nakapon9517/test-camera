import React , { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useCameraDevices, Camera, CameraRuntimeError} from 'react-native-vision-camera'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isCameraActive, setCameraActive] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  useEffect(() => {
    const permission = async () => {
      const newCameraPermission = await Camera.requestCameraPermission()
      const newMicrophonePermission = await Camera.requestMicrophonePermission()
      console.debug('permission request [', newCameraPermission, newMicrophonePermission, ']');
    }
    permission();
  }, []);
  useEffect(() => {
    const permission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      console.debug('permission is [', cameraPermission, microphonePermission, ']');
    }
    permission();
  }, []);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  
  console.debug(devices, '::', device);
  if (device == null) return <ActivityIndicator />;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device!}
      isActive={isCameraActive}
      onError={onError}
    />
    // <View style={styles.container}>
    //   {/* <Text style={styles.title}>Tab One</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <TouchableOpacity onPress={() => setCameraActive(true)}>
    //     <Text>aaa</Text>
    //   </TouchableOpacity> */}
    //   {device ? <Camera
    //     style={StyleSheet.absoluteFill}
    //     device={device}
    //     isActive={isCameraActive}
    //   /> :  <ActivityIndicator />}
    //   <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
