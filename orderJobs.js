const orderJobs = (jobDependencies) => {
    if(jobDependencies === '') {
        return ''
    }
    const formattedJobDependenciesArray = jobDependencies.split(',').map(jobDependency => {  // splits jobDependencies into an array then maps
        return jobDependency.replace(/(=>|\s)/g, '')  // regex to remove any => and whitespace
    }).sort() // then sorts job dependencies into alphabetical order
    const nonPriorityJobsArray = formattedJobDependenciesArray.reduce((nonPriorityJobsArray, jobDependency) => { // creates array of jobs that have no dependencies
        return jobDependency.length === 1 ? [...nonPriorityJobsArray, jobDependency] : nonPriorityJobsArray  // if job has no dependency add to nonPriority jobs
    },[])
    const jobSequenceArray = formattedJobDependenciesArray.reduce((jobSequenceAcc, jobDependency) => {
        if(jobDependency.length === 1){
            return jobSequenceAcc
        } else {
            const priorityJob = jobDependency[1] // allocates priority job to const
            const nonPriorityJob = jobDependency[0] // and similar for non prioity job
            if(priorityJob === nonPriorityJob){ // if jobs are the same i.e. self dependent
                throw new Error('Jobs cannot depend on themselves')
            } else if(!jobSequenceAcc.includes(priorityJob) && !jobSequenceAcc.includes(nonPriorityJob)){ //if job sequence array that we are adding to 
                // doesn't contain the priority or non priority job  
                return [...jobSequenceAcc, priorityJob, nonPriorityJob]  // adds job pair to front of array
            } else if(jobSequenceAcc.includes(priorityJob) && !jobSequenceAcc.includes(nonPriorityJob)) { // if job sequence contains the priority job only 
                const elementsUptoIncludingPriorityJob = [...jobSequenceAcc.slice(0, jobSequenceAcc.indexOf(priorityJob) + 1)] // store jobs upto and including priority job
                const elementsAfterPriorityJob = [...jobSequenceAcc.slice(jobSequenceAcc.indexOf(priorityJob) + 1)] // store jobs after priority job
                return [...elementsUptoIncludingPriorityJob, nonPriorityJob, ...elementsAfterPriorityJob] // put non priority job after priority job
            } else if(jobSequenceAcc.includes(nonPriorityJob) && !jobSequenceAcc.includes(priorityJob)) { // if job sequence contains the non priority job only
                const elementsUptoIncludingNonPriorityJob = [...jobSequenceAcc.slice(0, jobSequenceAcc.indexOf(nonPriorityJob))] // store jobs upto nonPriority job
                const elementsAfterNonPriorityJob = [...jobSequenceAcc.slice(jobSequenceAcc.indexOf(nonPriorityJob))] // store jobs after and including priority job
                return [...elementsUptoIncludingNonPriorityJob, priorityJob, ...elementsAfterNonPriorityJob] // put non priority job after priority job
            } else if (jobSequenceAcc.includes(priorityJob) && jobSequenceAcc.includes(nonPriorityJob)){ // else  the jobSequence contains both the non priority and piority job already
                   if(jobSequenceAcc.indexOf(priorityJob) < jobSequenceAcc.indexOf(nonPriorityJob)){ // if the priority job appears before the non priority job in the sequence 
                    return jobSequenceAcc  // return the sequence as both jobs are already accounted for and in correct order
                } else {
                    throw new Error('Jobs cannot have circular dependencies') // else there is a circular dependency issue
                }   
            }
        }
    },[])

    const finalJobSequenceArray = nonPriorityJobsArray.reduce((finalJobSequenceAcc, nonPriorityJob) => { //takes nonpriority jobs and combines them with the rest of the job sequence if not already allocated
        return finalJobSequenceAcc.includes(nonPriorityJob) ? finalJobSequenceAcc : [...finalJobSequenceAcc, nonPriorityJob]
    },jobSequenceArray)

    return finalJobSequenceArray.join('')
}

module.exports = { orderJobs }