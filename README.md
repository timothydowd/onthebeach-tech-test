# On the Beach Tech Test by Tim Dowd

This program is written in JS

My approach to this exercise was first to split the jobs into dependent job pairs and non dependent jobs.   
First I dealt with the dependent job pairs iteratively:  
- If neither jobs existed in the ordered job sequence that was being added to, both jobs would be added to the job sequence array  
- If one of the jobs in the pair existed in the ordered job sequence then the job that didnt exist would be added before or after in the sequence, depending on whether it was the dependent or non dependent job (priority/nonpriority job)  
- If both jobs were already allocated in the ordered job sequence then it would check that the nonprioritised job(dependent job), appeared after the priotitised job (non dependent job) in the sequence - if that wasn't the case then we would know there was a circular dependency issue.  

Finally the non dependant jobs would be added to the job dequence array if they were not already allocated for.    

Later on I realised that if you added job dependency strings that weren't very linear and had jobs that had more than one dependency on one another i.e ('a => b, c => d, a => d'), that the program would in some cases throw false circular dependency errors.  This was rectified by simply sorting the passed job dependency string into alphabetical order before being processed by the main functionality of the program.    

Note:  Normally I wouldnt include as many comments in my code but they have been added to assist showing my thinking, as outlined as a potential brownie point scorer in the brief.    

## Getting Started

### Prerequisites

- node version 10
- npm version 6

### Installation

1. Clone this repository

```bash
git clone https://github.com/timothydowd/onthebeach-tech-test.git
```

2. `cd` into the repository

```bash
cd onthebeach-tech-test
```

3. Install the dependencies

```bash
npm install
```

4. Run the tests

```bash
npm test
```


