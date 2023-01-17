/* eslint-disable react/prop-types */
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../themes/colors';
class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Icon name="caret-forward-outline" size={30} color={colors.white} />
      </Pressable>
    );
  }
}

export default PlayButton;

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.primary,
  },
});
