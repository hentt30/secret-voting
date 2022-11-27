// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    event addCandidateOk(int256 candidateNumber);

    struct Candidate {
        string name;
        string party;
        int256 number;
    }
    struct validVote {
        string candidate;
        int256 candidateNumber;
    }

    int256 numberOfCandidates;
    int256 numberOfVotes;

    mapping(int256 => Candidate) candidates;
    mapping(int256 => validVote) votes;

    function addCandidate(
        string memory name,
        string memory party,
        int256 candidateNumber
    ) internal {
        candidates[candidateNumber] = Candidate(name, party, candidateNumber);
        emit addCandidateOk(candidateNumber);
    }

    function getResultsForCandidate(int256 candidateNumber)
        public
        view
        returns (int256)
    {
        int256 numberCandidateVotes = 0;
        for (int256 j = 0; j < numberOfVotes; ++j) {
            if (votes[j].candidateNumber == candidateNumber) {
                ++numberCandidateVotes;
            }
        }
        return numberCandidateVotes;
    }

    function getNumberOfCandidates() public view returns (int256) {
        return numberOfCandidates;
    }

    function getNUmberOfVotes() public view returns (int256) {
        return numberOfVotes;
    }
}
