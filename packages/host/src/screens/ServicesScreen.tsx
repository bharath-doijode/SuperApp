import React, {useCallback} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigator';
import {Card, Paragraph, Title} from 'react-native-paper';
import services from '../data/services.json';
import {ServicesStackParamList} from '../navigation/ServicesNavigator';

type ServiceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ServicesStackParamList, 'Services'>,
  NativeStackScreenProps<MainStackParamList>
>;

type ServiceMenuItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const ServicesScreen = ({navigation}: ServiceScreenProps) => {
  const openFarmerLead = useCallback(
    () => navigation.navigate('FarmerLead'),
    [navigation],
  );

  // const openNews = useCallback(() => navigation.navigate('News'), [navigation]);

  // const openFarmer = useCallback(
  //   () => navigation.navigate('Farmer'),
  //   [navigation],
  // );

  const openDashboard = useCallback(
    () => navigation.navigate('Dashboard'),
    [navigation],
  );

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<ServiceMenuItem>) => {
      const lastItem = index === services.data.length - 1;
      const map = new Map([
        ['farmerLead', openFarmerLead],
        // ['farmer', openFarmer],
        ['dashboard', openDashboard],
      ]);

      const onPress =
        map.get(item.id) ?? (() => Alert.alert('Not implemented yet'));

      return (
        <View style={[styles.serviceItem]}>
          <Card mode="elevated" onPress={onPress} style={styles.cardItem}>
            {/* <Card.Cover source={{uri: `${item.image}?${index}`}} /> */}
            <Card.Content>
              <Title numberOfLines={1}>{item.title}</Title>
              <Paragraph numberOfLines={1}>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      );
    },
    [openFarmerLead, openDashboard/*, openFarmer */],
  );

  return (
    <FlatList
      data={services.data}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },
  serviceItem: {
    flex: 1,
    padding: 8,
    maxWidth: '100%',
  },
  lastServiceItem: {
    maxWidth: '50%',
  },
  cardItem: {
    flex: 1,
    width: '100%'
  },
});

export default ServicesScreen;
