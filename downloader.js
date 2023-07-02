import { Readable } from 'node:stream'
import fs from 'node:fs'
import getHeaders from './utils/getHeaders.js'
import getRange from './utils/getRange.js'
import getFileName from './utils/getFileName.js' 
import concatStreams from './utils/concatStreams.js'

(async (url, streamCount) => {
  try {
    const headers = await getHeaders(url)
    const allowRange = headers.get('accept-ranges')
    const contentLength = headers.get('content-length')

    if (!allowRange && allowRange === 'none') {
      throw new Error('Resource doesn\'t support partial download')
    }

    const partSize = Math.ceil(contentLength / streamCount)
    const downloadStreams = []

    for (let i = 0; i < streamCount; i++) {
      const range = getRange(partSize, i)
      const { body: stream } = await fetch(url, { headers: { Range: range } })

      downloadStreams.push(stream)
    }

    const chunks = await concatStreams(downloadStreams)
    const merged = Readable.from(chunks)
    const fileName = getFileName(url)

    await merged.pipe(fs.createWriteStream(fileName))

  } catch(err) {
    console.error(err)
  }
  })(process.argv[2], process.argv[3])
