const arg1 = parseInt(process.argv[2])
const arg2 = parseInt(process.argv[3])

if (arg1 < arg2) {
  for (let i = arg1; i <= arg2; i++) {
    console.log(i)
  }
} else if (arg1 > arg2) {
  for (let i = arg1; i >= arg2; i--) {
    console.log(i)
  }
} else {
  if (arg1 >= 10) {
    for (let i = arg1; i >= 0; i -= 2) {
      console.log(i)
    }
  } else {
    console.log(`${arg1} är samma som ${arg2}, men mindre än 10. Inga värden att skriva ut.`)
  }
}
