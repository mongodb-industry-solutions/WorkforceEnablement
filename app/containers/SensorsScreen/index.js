/**
 *
 * SensorsScreen
 *
 */

import { realmConnection, logoutUser } from 'containers/HomeScreen/actions';
import { Share, Box, Center, HStack, Image, Skeleton, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect } from 'react';
import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDate, getStatus, getType, getSeverity, getDescription} from '../../utils/helper';
import { getSensors } from './actions';

let Calander = require('app/images/calendar.png');
let Info = require('app/images/info.png');
let Loader = require('app/images/loader.png');
let Power = require('app/images/power.png');
let LeftIcon = require('app/images/chevron-left.png');
let RightIcon = require('app/images/arrow-right.png');
let Low = require('app/images/severity_low.png');
let High = require('app/images/severity_high.png');

export const SensorsScreen = ({ navigation }) => {
  const sensors = useSelector(state => state?.sensors?.sensors);
  const user = useSelector(state => state?.home?.user);
  const primaryRealm = useSelector(state => state?.home?.primaryRealm);
  const isLoading = useSelector(state => state?.global?.isLoading ?? true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadingSensors, setIsLoadingSensors] = React.useState(isLoading);
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (primaryRealm != null) {
      dispatch(getSensors(primaryRealm));
    }
    setRefreshing(false);
  }, [primaryRealm]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: () => (
        <Text fontSize={18} fontWeight={700} color={'black'}>
          My Alerts
        </Text>
      ),
      headerRight: () => (
        <Pressable
          onPress={async () => {
            dispatch(logoutUser());
            navigation.navigate('Home');
          }}
        >
          <Image alt="Img" size={6} marginRight={3} source={Power} />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Image
            alt='Img'
            size={7}
            marginLeft={3}
            source={LeftIcon}
          />
        </Pressable>
      ),
    });
  }, []);

  useEffect(() => {
    initiate();
  }, [user, primaryRealm, sensors]);

  const initiate = () => {
    if (user != null && primaryRealm == null) {
      dispatch(realmConnection(user));
    }
    if (primaryRealm != null && sensors?.length == 0) {
      dispatch(getSensors(primaryRealm));
    }
    if (sensors?.length > 0) {
      setIsLoadingSensors(false);
    }
  };
        
        
  const onPressSensorFromList = sensor => {
    navigation.navigate('Details', { sensor });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={1} />}
      >
        
        <Text fontSize={20}  fontWeight={400} paddingLeft={5}>Open Alerts </Text>
        <Text fontSize={20}  fontWeight={400} paddingLeft={5}>Acknowledged Alerts {getStatus(sensors?.acknowledged).length} </Text>
        
        <View style={styles.container}>
          <View style={{ padding: 15 }}>
            {isLoadingSensors ? (
              <Center w="100%">
                <VStack
                  w="90%"
                  maxW="400"
                  borderWidth="1"
                  space={8}
                  overflow="hidden"
                  rounded="md"
                  _dark={{
                    borderColor: 'coolGray.300',
                  }}
                  _light={{
                    borderColor: 'coolGray.200',
                  }}
                >
                  <View />
                  <Skeleton px="3" my="3" rounded="md" />
                  <View />
                  <Skeleton.Text px="4" />
                  <Skeleton px="3" my="3" rounded="md" />
                  <View />
                  <Skeleton.Text px="4" />
                  <Skeleton px="3" my="3" rounded="md" />
                  <Skeleton.Text px="4" />
                  <Skeleton px="3" my="3" rounded="md" />
                </VStack>
              </Center>
            ) : (
              sensors?.map(item => (
                <Pressable onPress={() => onPressSensorFromList(item)}>
                  <View>
                    <Box
                      borderColor="coolGray.200"
                      shadow={10}
                      borderLeftColor={'gray.900'}
                      borderRadius="14"
                      borderRightWidth={3}
                      borderBottomWidth={3}
                      _dark={{
                        borderColor: 'coolGray.600',
                        backgroundColor: 'gray.700',
                      }}
                      _web={{
                        shadow: 2,
                        borderWidth: 0,
                      }}
                      _light={{
                        backgroundColor: 'gray.50',
                      }}
                    >
                      <Box
                        style={{ padding: 4 }}
                        _dark={{
                          borderColor: 'gray.600',
                        }}
                        borderColor="coolGray.200"
                        pl="4"
                        pr="5"
                        py="2"
                      >
                      
                          <View />
                          <VStack paddingTop={1} justifyContent="space-between">
        
                            <HStack paddingBottom={2} space={5} justifyContent="flex-start" >
                              <Image alt="Img" marginTop={1} size="29px"  source={item?.id == 'cam' ? Low : High} />
                              <VStack>
                                <Text
                                  paddingTop={2}
                                  fontWeight={800}
                                  fontSize={15}
                                  color={item?.id == 'cam' ? 'yellow.400' : 'red.700'}
                                  bold
                                  _dark={{
                                    color: 'black',
                                  }}
                                >
                                  {getSeverity(item?.id)}
                                </Text>
                              </VStack>
                            
                            </HStack>
                                   
                            <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                              <Image alt="Img" marginTop={1} size="29px" source={Info} />
                              <VStack>
                                <Text
                                  fontWeight={400}
                                  _dark={{
                                    color: 'warmGray.50',
                                  }}
                                  color="coolGray.800"
                                >
                                  {'Type'}
                                </Text>
                                <Text
                                  fontWeight={800}
                                  fontSize={15}
                                  color="black"
                                  bold
                                  _dark={{
                                    color: 'black',
                                  }}
                                >
                                  {getType(item?.code)}
                                </Text>
              
                                   <Text
                                  fontWeight={400}
                                  _dark={{
                                    color: 'warmGray.50',
                                  }}
                                  color="coolGray.800"
                                >
                                  {'Description'}
                                </Text>
                                <Text
                                  fontWeight={800}
                                  fontSize={15}
                                  color="black"
                                  bold
                                  _dark={{
                                    color: 'black',
                                  }}
                                >
                                  {getDescription(item?.code)}
                                </Text>
                                   
                              </VStack>
                            </HStack>
              
                                   
                            <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                              <Image alt="Img" marginTop={1} size="29px"  source={Loader} />
                              <VStack>
                                <Text
                                  fontWeight={400}
                                  _dark={{
                                    color: 'warmGray.50',
                                  }}
                                  color="coolGray.800"
                                >
                                  {'Status'}
                                </Text>
                                <Text
                                  fontWeight={800}
                                  fontSize={15}
                                  color={item?.acknowledged ? 'green.700' : 'orange.400'}
                                  bold
                                  _dark={{
                                    color: 'black',
                                  }}
                                >
                                  {getStatus(item?.acknowledged)}
                                </Text>
                              </VStack>
                            </HStack>
                                   
                                   <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                              <Image alt="Img" marginTop={1} size="29px"  source={Calander} />
                              <VStack>
                                
                                <Text color={'gray.400'} fontSize={15} fontWeight={400} paddingTop={2} >{getDate(item?.ts)}</Text>
                                
                              </VStack>
                            </HStack>
                                   
                          </VStack>
              
                      </Box>
                    </Box>
                    <Text></Text>
                  </View>
                </Pressable>

                //Test new alert type div
                
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

SensorsScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
});

export default SensorsScreen;
