const match = (mediaTypes, mediaType) => mediaTypes.find(mt => mt === mediaType)

module.exports = (mediaTypes, mediaType) => {
  return match(mediaTypes, mediaType) || match(mediaTypes, /[^/]*/.exec(mediaType) + '/*') || match(mediaTypes, '*/*')
}
