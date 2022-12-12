const match = (mediaTypes, mediaType) => mediaTypes.find(mt => mt === mediaType)

export default (mediaTypes, mediaType) => {
  return match(mediaTypes, mediaType) || match(mediaTypes, /[^/]*/.exec(mediaType) + '/*') || match(mediaTypes, '*/*')
}
