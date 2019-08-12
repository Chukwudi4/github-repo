import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { Share } from 'react-native';
import { TrendingList } from '../screens/trending_list';
import { TrendingDetail } from '../screens/trending_detail';
import { Icon } from 'react-native-elements';
import {
  RFPercentage as w,
  RFValue as v,
} from 'react-native-responsive-fontsize';
const ListNav = createStackNavigator({
  TrendingList: {
    screen: TrendingList,
    navigationOptions: ({ navigation }) => ({
      title: 'Trending Repos',
      headerTitleStyle: { color: '#008081' },
    }),
  },
  TrendingDetail: {
    screen: TrendingDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.getParam('repo', 'Repo')}`,
      headerTitleStyle: { color: '#008081' },
      headerLeft: (
        <Icon
          name="ios-arrow-back"
          type="ionicon"
          color="#008081"
          containerStyle={{ marginHorizontal: v(16) }}
          onPress={() => navigation.goBack()}
        ></Icon>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginHorizontal: v(16) }}
          color="#008081"
          onPress={async () =>
            Share.share({
              title: 'Invite',
              url: `${navigation.state.params.url}`,
              message: `Hi check out ${navigation.state.params.author}'s awesome repo ${navigation.state.params.url}`,
            })
          }
          name="share"
        ></Icon>
      ),
    }),
  },
});

export const AppNav = createAppContainer(ListNav);
