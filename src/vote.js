import crypto from 'crypto-js'
import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const args = process.argv.slice(2)
const candidateNumber = args[1]
const id = BigInt("0x".concat(crypto.SHA256(args[0]).toString()))
const time = moment().unix()

VotingContract.deployed()
  .then(async (instance) => {
    // console.log(id, candidateNumber, time)
    await instance.vote(id, candidateNumber, time)
    console.log("Votado!")
  }).catch((err) => {
    console.log("ERROR: " + err.message)
  })
