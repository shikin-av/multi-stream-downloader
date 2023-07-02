export default async function* concatStreams(streams) {
  for (const stream of streams) {
    for await (const chunk of stream) {
      yield chunk
    }
  }
}
