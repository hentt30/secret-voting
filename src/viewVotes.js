import crypto from 'crypto-js'
import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const time = moment().unix()

VotingContract.deployed()
  .then(async (instance) => {
    console.log('hasVoted', (await instance.hasVoted(BigInt("0x".concat(crypto.SHA256('samuel').toString())))))
    console.log('hasVoted', (await instance.hasVoted(BigInt("0x".concat(crypto.SHA256('fernando').toString())))))
    console.log('13', (await instance.getResultsForCandidate(13, time)).toString())
    console.log('22', (await instance.getResultsForCandidate(22, time)).toString())
  })
  .catch((err) => {
    console.log("ERROR: " + err.message)
  })
