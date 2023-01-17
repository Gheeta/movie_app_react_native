/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeHolderImage = require('../assests/images/placeHolder.jpg');

const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.nameMovie}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 20,
  },
  nameMovie: {
    position: 'absolute',
    textAlign: 'center',
    // color: 'black',
    fontWeight: 'bold',
    width: 100,
  },
});

Card.propTypes = propTypes;

export default Card;
