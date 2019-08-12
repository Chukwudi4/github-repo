import React from 'react';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  Text,
  Picker,
  StyleSheet,
} from 'react-native';
import {
  RFPercentage as w,
  RFValue as v,
} from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
import { langs } from '../config/langs';
export class TrendingList extends React.Component {
  state = {
    trendingList: [],
    lang: 'Javascript',
    period: 'Daily',
  };

  render() {
    const { trendingList, period, lang, refreshing } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.fetchList}
            />
          }
        >
          <Picker
            selectedValue={lang}
            style={{ width: '100%', color: '#008081' }}
            mode="dialog"
            onValueChange={(item, index) => {
              this.setState({ lang: item, trendingList: [] });
              setTimeout(() => this.fetchList(), 2000);
            }}
          >
            {langs.map((item, index) => (
              <Picker.Item
                color="#008081"
                key={index}
                label={item}
                value={item.toLowerCase}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={period}
            style={{ width: '100%', color: '#008081' }}
            mode="dialog"
            onValueChange={(item, index) => {
              this.setState({ period: item, trendingList: [] });
              setTimeout(() => this.fetchList(), 2000);
            }}
          >
            <Picker.Item color="#008081" label="DAILY" value="Daily" />
            <Picker.Item color="#008081" label="WEEKLY" value="Weekly" />
          </Picker>
          <Text style={styles.header}>
            List of trending {lang} repositories ({period})
          </Text>
          {trendingList.map((item, index) => {
            return (
              <View key={index}>
                <TrendingItem item={item} navigation={this.props.navigation} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.fetchList();
  }

  fetchList = async () => {
    const { lang, period } = this.state;
    try {
      this.setState({ refreshing: true });
      var git = await fetch(
        `https://trendy-backend.herokuapp.com/?period=${period}&lang=${lang}`
      );
      this.setState({ refreshing: false });
      var result = await git.json();
      //console.log(result)
      this.setState({ trendingList: result });
    } catch (error) {
      console.warn(error.message);
    }
  };
}

const TrendingItem = props => {
  const { item, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.itemTouch}
      onPress={() =>
        navigation.navigate('TrendingDetail', {
          repo: `${item.name}`,
          author: `${item.author}`,
          url: `${item.href}`,
        })
      }
    >
      <Text style={styles.itemText}>
        {item.author}{' '}
        <Text style={{ fontSize: v(14), fontWeight: 'normal' }}>
          {'\n'}
          {item.name}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    color: '#4422EE',
    fontSize: v(15),
    margin: w(0.5),
    fontWeight: 'bold',
    marginHorizontal: w(1),
    paddingHorizontal: w(2),
    paddingVertical: w(2.5),
    backgroundColor: '#f6f6f6',
  },
  header: {
    color: '#008081',
    fontSize: v(15),
    margin: w(0.5),
    fontWeight: 'bold',
    marginHorizontal: w(1),
  },
  itemTouch: {
    shadowColor: 'rgba(0, 0, 0, 0.36)',
    shadowOffset: { width: 100, height: 100 },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 4,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: v(50),
    height: v(70),
    backgroundColor: '#008081',
  },
  actionText: {
    color: 'white',
    fontWeight: '900',
  },
});
