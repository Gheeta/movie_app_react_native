import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
// import Carousel from 'react-native-snap-carousel';

// eslint-disable-next-line import/named
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';

const dimensions = Dimensions.get('screen');
// eslint-disable-next-line react/prop-types
const Home = ({navigation}) => {
  console.log(dimensions);

  const [movieImages, setMovieImages] = useState();
  const [popularMovie, setPopularMovie] = useState();
  const [PopularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  // const [movie, setMovie] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  {
    /* array for testing */
  }
  const images = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMovieData,
          PopularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMovieImages(moviesImagesArray);
          setPopularMovie(popularMovieData);
          setPopularTv(PopularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {/* <Text>Movie Name: {movie.original_title} </Text>
    <Text>Languagee: {movie.original_language} </Text>
    <Text>Release Date: {movie.release_date} </Text>
{error && <Text style={{color: 'red'}}>Error in the server</Text>}  //error message */}

          {/* movie Images */}
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}

          {/* popular Movie */}
          {popularMovie && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovie}
              />
            </View>
          )}

          {/* Popular Tv */}
          {PopularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Tv"
                content={PopularTv}
              />
            </View>
          )}
          {/* family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {/* documentaryMovies */}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" color="green" />}
      {error && <Error />}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
