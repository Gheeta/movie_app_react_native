import React from 'react';
import VideoPlayer from 'react-native-video-controls';

// eslint-disable-next-line react/prop-types
const Video = ({onClose}) => {
  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      onEnd={() => onClose()}
      onBack={() => {
        onClose();
      }}
      fullScreenOrientation="all"
    />
  );
};

export default Video;
