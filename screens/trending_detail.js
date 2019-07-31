import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  RFPercentage as w,
  RFValue as v,
} from 'react-native-responsive-fontsize';
import { Icon, Avatar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
export class TrendingDetail extends React.Component {
  state = {
    fullname: '',
    starCount: 0,
    subscriberCount: 0,
    description: '',
    license: '',
    avatar: 'https://avatars2.githubusercontent.com/u/15094348?s=460&v=4',
    loading: true,
  };

  render() {
    const {
      fullname,
      starCount,
      subscriberCount,
      loading,
      license,
      description,
      avatar,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Spinner visible={loading} />
          <Avatar rounded source={{ uri: avatar }} size="large" />

          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Repo:</Text> {fullname}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Description:</Text>{' '}
            {description}
          </Text>
          <View style={styles.star}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>Star </Text>
            <Icon color="#4C516D" name="ios-star" size={v(14)} type="ionicon" />
            <Text style={styles.text}> {starCount}</Text>
          </View>

          <View style={styles.star}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              Subscribers{' '}
            </Text>
            <Icon
              color="#4C516D"
              name="ios-person"
              size={v(14)}
              type="ionicon"
            />
            <Text style={styles.text}>: {subscriberCount}</Text>
          </View>

          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>License:</Text> {license}
          </Text>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.fetchDetail();
  }

  fetchDetail = async () => {
    try {
      var { navigation } = this.props;
      var author = navigation.getParam('author');
      var repo = navigation.getParam('repo');
      this.setState({ loading: true });
      const detail = await fetch(
        `https://api.github.com/repos/${author}/${repo}`
      );
      const det = await detail.json();
      this.setState({
        fullname: det.full_name,
        description: det.description,
        starCount: det.stargazers_count,
        subscriberCount: det.subscribers_count,
        license: det.license === null ? 'None' : det.license.name,
        avatar: det.owner.avatar_url,
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: w(1),
  },
  image: {
    width: v(60),
    height: v(100),
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#4C516D',
    fontSize: v(14),
    marginVertical: w(0.5),
  },
});
