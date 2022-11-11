
/**
 *
 * ProfileScreen
 *
 */

import { getSensors, setLoading } from 'containers/SensorsScreen/actions';
import { Box, Button, Divider, HStack, Image, Text, TextArea, VStack } from 'native-base';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'containers/HomeScreen/actions';
import { getSensorImage, getStatus, getType } from '../../utils/helper';

let Alert = require('app/images/alert.png');
let ImagePlaceholder = require('app/images/image.png');
let Power = require('app/images/power.png');
let LeftIcon = require('app/images/chevron-left.png');
let RightIcon = require('app/images/arrow-right.png');
let UserPhoto = require('app/images/user_photo.png');
var ObjectID = require('bson-objectid');

const ProfileScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const primaryRealm = useSelector(state => state?.home?.primaryRealm);
  const user = useSelector(state => state?.home?.user);
  const [sensor, setSensor] = React.useState(props?.route?.params?.sensor ?? {});
  const [notes, setNotes] = React.useState(sensor?.notes ?? '');
  const [isAcknowledging, setIsAcknowledging] = React.useState(false);
  const isAcknowledgeButtonRef = useRef();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: () => (
        <Text fontSize={18} fontWeight={700} color={'black'}>
          Hey user!
        </Text>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            dispatch(logoutUser(navigation));
            navigation.navigate('Home');
          }}
        >
          <Image alt="Img" size={6} marginRight={3} source={Power} />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
           <View />
      ),
    });
  }, []);

  const onSubmitAcknowledgeOrBack = async () => {
    setIsAcknowledging(true);
    if (sensor?.acknowledged) {
      setIsAcknowledging(false);
      return navigation.navigate('Sensors');
    } else {
      dispatch(setLoading(true));
      primaryRealm.write(() => {
        let sensorFromRealm = primaryRealm.objects('sensors').filtered('_id = $0', ObjectID(sensor?._id));
        sensorFromRealm[0].notes = notes ?? '';
        sensorFromRealm[0].acknowledged = true;
        sensorFromRealm[0].acknowledgedBy = user?.id;
        setSensor(sensorFromRealm[0]);
        setIsAcknowledging(false);
        dispatch(getSensors(primaryRealm));
      });
    }
  };

  return (
   
         <InputScrollView style={{ backgroundColor: 'white' }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
      

            <View style={{ backgroundColor: 'white' }}>
              <View style={{ padding: 15 }}>
                <View style={{ backgroundColor: 'white' }}>
                  <VStack space={2} >

                    <HStack h={200} alignItems={'center'} justifyContent='center' >
                        <Image alt='Img' marginTop={1} size="150" source={UserPhoto} />
                    </HStack>
      
                     <HStack h={100} alignItems={'center'} justifyContent='flex-start' marginBottom={0}>
                        <Text fontSize={20} bold fontWeight={400} paddingLeft= {2}> Day Shift </Text>
                        <Text fontSize={20} bold fontWeight={400} paddingLeft= {50}> Start </Text>
                        <Text fontSize={20} bold fontWeight={400} paddingLeft= {60} > End </Text>
                    </HStack>

                    <HStack h={20} alignItems={'center'} justifyContent='flex-start' marginTop={-70}>
                        <Text fontSize={20} fontWeight={400} paddingLeft= {2}> {date} </Text>
                        <Text fontSize={20} fontWeight={400} paddingLeft= {31} > 08:00AM </Text>
                        <Text fontSize={20} fontWeight={400} paddingLeft= {6} > 04:00PM </Text>
                    </HStack>

                <Pressable onPress={() => navigation.navigate('Sensors')}>
                    <Box borderColor="coolGray.200"
                                      shadow={10}
                                      borderLeftColor={'gray.900'}
                                      borderRadius="14"
                                      borderRightWidth={3}
                                      borderBottomWidth={3}
                                   >

                   
                        <HStack h={8} alignItems={'center'} justifyContent='flex-start' marginTop={5}>
                             <Text fontSize={20} bold fontWeight={400} paddingLeft={2}> Alerts assigned to me </Text>
                            <Image alt='Img' marginTop={1} marginLeft={90} size="29px" source={RightIcon} />
                        </HStack>

                    <HStack h={180} alignItems={'center'} justifyContent='center' marginTop={-10} >
                        <VStack h={90} alignItems={'center'} justifyContent='center'>
                            <Text fontSize={30} bold fontWeight={400} color={'orange.400'} > Number </Text>
                            <Text fontSize={20} fontWeight={400} > New </Text>
                        </VStack>

                        <VStack h={90} alignItems={'center'} justifyContent='center' paddingLeft={50}>
                            <Text fontSize={30} bold fontWeight={400} color={'green.700'} > {getStatus(sensor?.acknowledged).length} </Text>
                            <Text fontSize={20} fontWeight={400}> Acknowledged </Text>
                        </VStack>
                    </HStack>

                </Box>
            </Pressable>

                  </VStack>
                </View>
              </View>
            </View>

        </ScrollView>
    </InputScrollView >
        
  );
};

export default ProfileScreen;
