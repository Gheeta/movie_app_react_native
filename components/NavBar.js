/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import colors from '../themes/colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};
class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              source={require('../assests/images/logo.png')}
              style={styles.logo}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search'); // navigation props to get back pervious
              }}>
              <Icon name="search" size={40} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack(); // navigation props to get back pervious
              }}>
              <Icon name="chevron-back" size={40} color={colors.lightGray} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;

const styles = StyleSheet.create({
  mainNav: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
