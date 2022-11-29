import crypto from 'crypto-js'
import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const args = process.argv.slice(2)
const time = moment().unix()
const list = JSON.parse(args[0])

VotingContract.deployed()
  .then(async (instance) => {
    console.log('hasVoted', '$@mu3l', (await instance.hasVoted(BigInt("0x".concat(crypto.SHA256('samuel').toString())))))
    console.log('hasVoted', 'fernando', (await instance.hasVoted(BigInt("0x".concat(crypto.SHA256('fernando').toString())))))
    await Promise.all(list.map(async (num) => {
      console.log(num, (await instance.getResultsForCandidate(parseInt(num), time)).toString())
    }))
  })
  .catch((err) => {
    console.log("ERROR: " + err.message)
  })
