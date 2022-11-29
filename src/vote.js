import crypto from 'crypto-js'
import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const args = process.argv.slice(2)
const candidateNumber = args[1]
const id = crypto.MD5(args[0]).toString()
console.log("0x".concat(id))
const time = moment().unix()

VotingContract.deployed()
  .then(async (instance) => {
    console.log("0x".concat(id), candidateNumber, time)
    await instance.vote(id, candidateNumber, time)
    console.log("Votado!")
  }).catch((err) => {
    console.log("ERROR: " + err.message)
  })
