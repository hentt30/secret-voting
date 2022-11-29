import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const args = process.argv.slice(2)
const name = args[0]
const party = args[1]
const number = parseInt(args[2], 10)
const time = moment().unix()

VotingContract.deployed()
  .then(async (instace) => {
    await instace.addCandidate(name, party, number, time)
    // const candidates = await instace.getCandidates()
    // console.log('Current candidates: ', candidates)
  })
  .catch((err) => {
    console.log("ERROR: " + err.message)
  })
