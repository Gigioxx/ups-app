import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/core';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useCustomersOrders from '../hooks/useCustomersOrders';
import { FlatList } from 'react-native';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'MyModal'>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomersOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tw('absolute right-5 top-5 z-10')}
      >
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>

      <View style={tw('mt-10')}>
        <View style={[tw('py-5 border-b'), { borderColor: '#59C1CC' }]}>
          <Text
            style={[tw('text-center text-xl font-bold'), { color: '#59C1CC' }]}
          >
            {name}
          </Text>
          <Text style={[tw('text-center italic text-sm')]}>deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
