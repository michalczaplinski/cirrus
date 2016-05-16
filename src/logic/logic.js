import moment from 'moment';

function hotTrackSort(a, b) {

  // we multiply likes by 100, so that our index is a larger number
  // we add 1 to the playback count to avoid division by 0
  if (((a.likes_count + 1) * 100 / (a.playback_count + 1)) < ((b.likes_count + 1) * 100 / (b.playback_count + 1))) {
    return 1;
  } else {
    return -1;
  }
}

function topTrackSort(a, b) {
  if (a.playback_count < b.playback_count) {
    return 1;
  } else {
    return -1
  }
}

function recentTrackSort(a, b) {
  let aDate = moment(a.created_at, 'YYYY/MM/DD hh:mm:ss +0000');
  let bDate = moment(b.created_at, 'YYYY/MM/DD hh:mm:ss +0000');
  if (aDate < bDate) {
    return 1;
  } else {
    return -1
  }
}

export function sortTracks(route = '/hot', tracks) {
  switch (route) {

    case '/':
      return tracks.sort(hotTrackSort);

    case '/hot':
      return tracks.sort(hotTrackSort);

    case '/top':
      return tracks.sort(topTrackSort);

    case '/recent':
      return tracks.sort(recentTrackSort);

    default:
      console.log('this should never happen');
      break;
  }
}
