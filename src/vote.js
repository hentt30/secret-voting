const Web3 = require("web3")
const contract = require("truffle-contract")
const votingArtifacts = require("../build/contracts/Voting.json")


let VotingContract = contract(votingArtifacts)
let candidates = []
console.log("Connecting to local server")
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
VotingContract.setProvider(web3.currentProvider)
VotingContract.defaults({ from: web3.eth.accounts[0], gas: 6721975 })

let id = "henrique"
let candidateNumber = 13

VotingContract.deployed().then(function (instance) {

    instance.vote(id, candidateNumber).then(
        function (result) {
            console.log("Votado!")
        }
    )
}).catch(function (err) {
    console.log("ERROR! " + err.message)
})