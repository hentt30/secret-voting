const Web3 = require("web3")
const contract = require("truffle-contract")
const votingArtifacts = require("../build/contracts/Voting.json")


let VotingContract = contract(votingArtifacts)
let candidates = []
console.log("Connecting to local server")
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
VotingContract.setProvider(web3.currentProvider)
VotingContract.defaults({ from: web3.eth.accounts[0], gas: 6721975 })

VotingContract.deployed().then(function (instance) {

    instance.getNumberOfCandidates().then(function (data) {
        let numOfCandidates = data
        if (numOfCandidates == 0) {
            let candidateNumber = 13
            instance.addCandidate("Candidate1", "Democratic", candidateNumber).then(function (result) {
                console.log(`Added candidate with number: ${candidateNumber}`)

            })
            let candidate2Number = 22
            instance.addCandidate("Candidate2", "Republican", candidate2Number).then(function (result) {
                console.log(`Added candidate with number: ${candidate2Number}`)

            })
            numOfCandidates = 2
        }
        else { // if candidates were already added to the contract we loop through them and display them
            instance.getCandidates().then(function (data) {
                for (let i = 0; i < numOfCandidates; i++) {
                    // gets candidates and displays them
                    instance.getResultsForCandidate(data[i]).then(function (votes) {
                        console.log(`id=${data[i]} votes=${votes}`)
                    })
                }
            })

        }
        numOfCandidates = numOfCandidates
    })
}).catch(function (err) {
    console.log("error")
    //console.log("ERROR! " + err.message)
})