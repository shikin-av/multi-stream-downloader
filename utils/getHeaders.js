export default async function getHeaders(url) {
  const res = await fetch(url, { method: 'HEAD' })
  return res.headers
}
