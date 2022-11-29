import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const time = moment().unix()

VotingContract.deployed()
  .then(async (instance) => {
    const candidates = await instance.getCandidates(time)
    console.log(candidates)
  })
  .catch((err) => {
    console.log("ERROR: " + err.message)
  })
