import path from 'node:path'

export default function getFileName (urlStr) {
    const url = new URL(urlStr)
    return path.basename(url.pathname)
}
