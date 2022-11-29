import moment from "moment"
import init from "./_loadContract.js"

const VotingContract = init()

const args = process.argv.slice(2)
const start = moment().add(parseInt(args[0], 10), args[1]).unix()
const end = moment().add(parseInt(args[2], 10), args[3]).unix()

VotingContract.deployed()
  .then(async (instace) => {
    await instace.setupElection(start, end)
    console.log('Election setted up successfully.')
    const startTime = await instace.getStartTime()
    const endTime = await instace.getEndTime()
    console.log('start: ', moment.unix(startTime).toISOString())
    console.log('end: ', moment.unix(endTime).toISOString())
  })
  .catch((err) => {
    console.log("ERROR: " + err.message)
  })
