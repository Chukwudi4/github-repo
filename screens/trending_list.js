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
              this.fetchList();
            }}
          >
            {langs.map((item, index) => (
              <Picker.Item
                color="#008081"
                key={index}
                label={item}
                value={item}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={lang}
            style={{ width: '100%', color: '#008081' }}
            mode="dialog"
            onValueChange={(item, index) => {
              this.setState({ period: item, trendingList: [] });
              this.fetchList();
            }}
          >
            <Picker.Item color="#008081" label="Daily" value="Daily" />
            <Picker.Item color="#008081" label="Weekly" value="Weekly" />
          </Picker>
          <Text style={[styles.itemText, { fontSize: v(18) }]}>
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
        `http://192.168.43.68:3000/?period=${period}&lang=${lang}`
      );
      this.setState({ refreshing: false });
      var result = await git.json();
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
      onPress={() =>
        navigation.navigate('TrendingDetail', {
          repo: `${item.name}`,
          author: `${item.author}`,
        })
      }
    >
      <Text style={styles.itemText}>
        {item.author}/ <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
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
    fontSize: v(14),
    margin: w(0.5),
    marginHorizontal: w(1),
  },
});
