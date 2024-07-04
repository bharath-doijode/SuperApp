import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Avatar, Card, Button, Divider, Text} from 'react-native-paper';
import {TabsParamList} from '../navigation/TabsNavigator';
import {HomeStackParamList} from '../navigation/HomeNavigator';
import upcomingBookings from '../data/upcomingBookings.json';
import recentBookings from '../data/recentBookings.json';
import featuredServices from '../data/featuredServices.json';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  MaterialBottomTabScreenProps<TabsParamList, 'HomeNavigator'>
>;

const renderAppointment = ({item}: any) => (
  <Card mode="contained">
    <Card.Title
      titleVariant="titleMedium"
      subtitleVariant="bodyMedium"
      title={`${item.title} • ${item.provider}`}
      subtitle={`${item.date} ${item.time}`}
      // left={props => <Avatar.Icon {...props} icon="calendar" />}
    />
    <Card.Actions>
      <Button mode="text" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }} onPress={() => {}}>
        Cancel
      </Button>
      <Button mode="contained" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }} onPress={() => {}}>
        Reschedule
      </Button>
    </Card.Actions>
  </Card>
);

const renderService: ListRenderItem<any> = ({item, index}) => (
  <Card mode="contained">
    {/* <Card.Cover source={{uri: `${item.image}?${index}`}} /> */}
    <Card.Title
      titleVariant="titleMedium"
      subtitleVariant="bodyMedium"
      title={`${item.title} • ${item.place}`}
      subtitle={item.address}
    />
  </Card>
);

const renderDivider = () => <Divider style={styles.divider} />;

const HomeScreen = ({navigation}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Farmers List
        </Text>
        <Button
          mode="contained-tonal"
          style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }}
          onPress={() => Alert.alert('Not implemented yet')}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={featuredServices.data}
        renderItem={renderService}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Commodities list
        </Text>
        <Button
        style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }}
          mode="contained-tonal"
          onPress={() => navigation.navigate('Commodities')}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={upcomingBookings.data}
        renderItem={renderAppointment}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent Appointments
        </Text>
        <Button
        style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }}
          mode="contained-tonal"
          onPress={() => Alert.alert('Not implemented yet')}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentBookings.data}
        renderItem={renderAppointment}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: 'transparent',
    width: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  cardWidth: {
    width: 270,
  },
});

export default HomeScreen;
