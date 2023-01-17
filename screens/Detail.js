/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';

import {Rating} from 'react-native-stock-star-rating'; // best thing for star rating in react native
import date from 'dateformate';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from '../components/Video';
import PlayButton from '../components/PlayButton';
import {getMovie} from '../services/services';

const placeHolderImage = require('../assests/images/placeHolder.jpg');

const {height} = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const {movieId} = route.params;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    {
      /* toggle to show model video in detail */
    }
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>

              <Text style={[styles.movieTitle, styles.text]}>
                {movieDetail.title}
              </Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={[styles.text, styles.genre]}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Rating
                stars={movieDetail.vote_average / 2}
                maxStars={5}
                size={30}
                disabled={true}
                color="red"
                bordered={false}
              />
              <Text style={[styles.overview, styles.text]}>
                {movieDetail.overview}
              </Text>
              <Text style={[styles.release, styles.text]}>
                {'Release Date:- ' + movieDetail.release_date}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <VideoPlayer onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" color="blue" />}
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    color: 'black',
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
