export function bestTrackSort(a, b) {

  // we multiply likes by 100, so that our index is a larger number
  // we add 1 to the playback count to avoid division by 0
  if (((a.likes_count + 1) * 100 / (a.playback_count + 1)) < ((b.likes_count + 1) * 100 / (b.playback_count + 1))) {
    return 1;
  } else {
    return -1;
  }
}
