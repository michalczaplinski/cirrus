function hotTrackSort(a, b) {

  // we multiply likes by 100, so that our index is a larger number
  // we add 1 to the playback count to avoid division by 0
  if (((a.likes_count + 1) * 100 / (a.playback_count + 1)) < ((b.likes_count + 1) * 100 / (b.playback_count + 1))) {
    return 1;
  } else {
    return -1;
  }
}

function mostListenedTrackSort(a, b) {
  if (((a.likes_count + 1) * 100 / (a.playback_count + 1)) < ((b.likes_count + 1) * 100 / (b.playback_count + 1))) {
    return -1;
  } else {
    return 1;
  }
}

function mostLikedTrackSort(a, b) {

}

function recentTrackSort(a, b) {

}

export function sortTracks(route = '/hot', tracks) {
  switch (route) {

    case '/':
      return tracks.sort(hotTrackSort);

    case '/hot':
      return tracks.sort(hotTrackSort);

    //todo: implement the new sort types
    case '/best':
      return tracks.sort(mostListenedTrackSort);

    case '/top':
      return tracks.sort(mostListenedTrackSort);

    default:
      console.log('this should never happen');
      break;
  }
}
