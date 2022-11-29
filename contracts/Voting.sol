// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    event addCandidateOk(uint256 candidateNumber);

    struct Voter {
        uint256 cpf;
        uint16 sectionCode;
        bool exists;
    }

    struct Candidate {
        string name; // prefer bytes32 in production (cheaper)
        string party;
        uint16 number;
        bool exists;
    }

    struct ValidVote {
        uint256 id;
        uint16 candidateNumber;
    }

    struct Total {
        uint256 totalOfVotes;
        bool exists;
    }

    uint16 numberOfCandidates;
    uint16[] candidateNumbers;
    mapping(uint256 => Candidate) candidates;

    uint256 numberOfVotes;
    ValidVote[] votes;

    mapping(uint256 => Total) results;
    mapping(uint256 => Voter) voters;

    address electionStarter;
    uint256 votingStartTime;
    uint256 votingEndTime;

    constructor() {
        electionStarter = msg.sender;
    }

    // Main functions for an election

    function setupElection(uint256 start_, uint256 end_) public isStarter {
        votingStartTime = start_;
        votingEndTime = end_;
    }

    function addCandidate(
        string memory name,
        string memory party,
        uint16 candidateNumber,
        uint256 currentTime
    ) public hasntVotingStarted(currentTime) hasntCandidated(candidateNumber) {
        candidates[candidateNumber] = Candidate(
            name,
            party,
            candidateNumber,
            true
        );
        ++numberOfCandidates;
        candidateNumbers.push(candidateNumber);
    }

    function vote(
        uint256 voterID,
        uint16 candidateID,
        uint256 currentTime
    ) public isVotingOpen(currentTime) {
        // checks if the struct exists for that candidate
        if (candidates[candidateID].exists == true) {
            if (hasVoted(voterID) == false) {
                voters[voterID] = Voter(voterID, 0, true);
                votes.push(ValidVote(voterID, candidateID));
                ++numberOfVotes;
                if (results[candidateID].exists == true) {
                    results[candidateID].totalOfVotes++;
                } else {
                    results[candidateID] = Total(1, true);
                }
            }
        }
    }

    // Basic getters for an election

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](numberOfCandidates);
        for (uint16 i = 0; i < numberOfCandidates; i++) {
            allCandidates[i] = candidates[candidateNumbers[i]];
        }
        return allCandidates;
    }

    function getNumberOfCandidates() public view returns (uint256) {
        return numberOfCandidates;
    }

    function getStartTime() public view returns (uint256) {
        return votingStartTime;
    }

    function getEndTime() public view returns (uint256) {
        return votingEndTime;
    }

    // Public view functions allowed only after voting ends

    function getNumberOfVotes(uint256 currentTime)
        public
        view
        hasVotingEnded(currentTime)
        returns (uint256)
    {
        return numberOfVotes;
    }

    function getResultsForCandidate(
        uint256 candidateNumber,
        uint256 currentTime
    ) public view hasVotingEnded(currentTime) returns (uint256) {
        return results[candidateNumber].totalOfVotes;
    }

    // Internal funcions/modifiers

    function hasVoted(uint256 voterID) public view returns (bool) {
        return (voters[voterID].exists == true);
    }

    modifier hasntCandidated(uint16 candidateID) {
        require(candidates[candidateID].exists != true);
        _;
    }

    modifier isStarter() {
        require(msg.sender == electionStarter);
        _;
    }

    modifier isVotingOpen(uint256 time) {
        require(time >= votingStartTime);
        require(time <= votingEndTime);
        _;
    }

    modifier hasntVotingStarted(uint256 time) {
        require(time < votingStartTime);
        _;
    }

    modifier hasVotingEnded(uint256 time) {
        require(time > votingEndTime);
        _;
    }
}
