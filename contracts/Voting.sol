// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    event addCandidateOk(uint256 candidateNumber);

    struct Candidate {
        string name;
        string party;
        uint256 number;
        bool exists;
    }
    struct ValidVote {
        string id;
        uint256 candidateNumber;
    }

    uint256 numberOfCandidates;
    uint256 numberOfVotes;

    uint256[] _keys;

    mapping(uint256 => Candidate) candidates;
    mapping(uint256 => ValidVote) votes;

    function addCandidate(
        string memory name,
        string memory party,
        uint256 candidateNumber
    ) public returns (uint256) {
        if (candidates[candidateNumber].exists != true) {
            candidates[candidateNumber] = Candidate(
                name,
                party,
                candidateNumber,
                true
            );
            ++numberOfCandidates;
            _keys.push(candidateNumber);
        }

        return candidateNumber;
    }

    function vote(string memory id, uint256 candidateID) public {
        // checks if the struct exists for that candidate
        if (candidates[candidateID].exists == true) {
            uint256 voterID = numberOfVotes++;
            votes[voterID] = ValidVote(id, candidateID);
        }
    }

    function getResultsForCandidate(uint256 candidateNumber)
        public
        view
        returns (uint256)
    {
        uint256 numberCandidateVotes = 0;
        for (uint256 j = 0; j < numberOfVotes; ++j) {
            if (votes[j].candidateNumber == candidateNumber) {
                ++numberCandidateVotes;
            }
        }
        return numberCandidateVotes;
    }

    function getNumberOfCandidates() public view returns (uint256) {
        return numberOfCandidates;
    }

    function getNumberOfVotes() public view returns (uint256) {
        return numberOfVotes;
    }

    function getCandidates() public view returns (uint256[] memory) {
        return _keys;
    }
}
