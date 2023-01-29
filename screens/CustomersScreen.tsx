import { ActivityIndicator, ScrollView, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Input } from '@rneui/themed';

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#59C1CC' }}>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dqrdhv5kw/image/upload/v1674913310/customersImage_mxoed0.jpg',
        }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        placeholder='Search by customer'
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white pt-5 pb-0 px-10')}
      />
    </ScrollView>
  );
};

export default CustomersScreen;
