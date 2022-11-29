import Web3 from "web3"
import contract from "truffle-contract"
import votingArtifacts from "../build/contracts/Voting.json" assert { type: "json" }

const init = () => {
  try {
    const VotingContract = contract(votingArtifacts)
    console.log("Connecting to local server...")
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
    console.log("Connected.")
    VotingContract.setProvider(web3.currentProvider)
    VotingContract.defaults({ from: web3.eth.accounts[0], gas: 6721975 })
    return VotingContract;
  } catch (error) {
    console.error(error)
  }
}

export default init;