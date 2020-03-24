 const generate =  () => {  
    return Math.floor(
      Math.random() * (2000000 - 1000000) + 10000
    )
  }

module.exports = generate
