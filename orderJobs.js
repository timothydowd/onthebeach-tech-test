// The purpose of this exercise is to see how you approach a problem, and how you solve it. We’re interested to see how you structure
// your Ruby code, your command of the language and good design and testing principles, bear this in mind throughout.
// HINT: Start with a method that accepts a single string argument and returns a string (or a collection) which represents the ordered
// sequence of jobs (since each job is a single character).
// HINT: Brownie points will be given for showing us your working (notes, commit history, some kind of idea how you approached the
// problem).
// HINT: We’re pretty keen on tested code.
// Have Fun.

// Imagine we have a list of jobs, each represented by a character. Because certain jobs must be done before others, a job may have a
// dependency on another job. For example, a may depend on b, meaning the final sequence of jobs should place b before a. If a has no
// dependency, the position of a in the final sequence does not matter.


const orderJobs = (jobDependencies) => {
    console.log('jobDependencies: ', jobDependencies)
    const formattedJobDependencies = jobDependencies.replace(/(=>|\s)/g, '') // regex to remove any => and whitespace
    console.log('formattedJobDependencies: ', formattedJobDependencies)

    

    if(formattedJobDependencies.length > 1){ // if job has a dependency i.e 'a => b' instead of 'a =>'
        const prioritisedJobPair = formattedJobDependencies.slice(-1) + formattedJobDependencies.slice(0,1) // reorders that pair of jobs and returns them
        console.log('prioritisedJobPair: ', prioritisedJobPair)
        return prioritisedJobPair
    } else { // else it just returns the single job
        return formattedJobDependencies
    }

    
}


module.exports = { orderJobs }