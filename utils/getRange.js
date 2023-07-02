export default function getRange(partSize, partNumber) {
  const start = partNumber * partSize + (partNumber === 0 ? 0 : 1)
  const end = (partNumber + 1) * partSize
  
  return `bytes=${start}-${end}`
}