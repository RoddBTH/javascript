const arg = parseInt(process.argv[2])

if (arg < 10) {
  console.log(`${arg} är lägre än 10.`)
} else if (arg >= 100) {
  console.log(`${arg} är högre än eller lika med 100.`)
} else if (arg > 10 && arg < 20) {
  console.log(`${arg} är mellan 10 och 20.`)
}

if ((arg % 2) === 0) {
  console.log(`${arg} är ett jämnt tal.`)
} else {
  console.log(`${arg} är ett udda tal.`)
}

if (arg === 42) {
  console.log('Meaning of life.')
}
