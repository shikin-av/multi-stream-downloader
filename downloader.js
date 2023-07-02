import getHeaders from './utils/getHeaders.js'

(async (url) => {
  try {
    const headers = await getHeaders(url)
    const allowRange = headers.get('accept-ranges')
    const contentLength = headers.get('content-length')

    if (!allowRange && allowRange === 'none') {
      throw new Error('Resource doesn\'t support partial download')
    }

  } catch(err) {
    console.error(err)
  }
  })(process.argv[2])
