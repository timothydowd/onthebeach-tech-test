const orderJobs = (jobDependencies) => {
    if(jobDependencies === '') {
        return ''
    }

    console.log('jobDependeices: ', jobDependencies)

    const formattedJobDependenciesArray = jobDependencies.split(',').map(jobDependency => {  // splits jobDependencies into an array then maps
        return jobDependency.replace(/(=>|\s)/g, '')  // regex to remove any => and whitespace
    })
    console.log('formattedJobDependenciesArray: ', formattedJobDependenciesArray)

    const nonPriorityJobs = formattedJobDependenciesArray.reduce((nonPriorityJobs, jobDependency) => { // creates array of jobs that have no dependencies
        return jobDependency.length === 1 ? [...nonPriorityJobs, jobDependency] : nonPriorityJobs  // if job has no dependency add to nonPriority jobs
    },[])

    console.log('nonpriorityjobs: ', nonPriorityJobs)
    
    const jobSequenceArray = formattedJobDependenciesArray.reduce((jobSequence, jobDependency) => {
        if(jobDependency.length === 1){
            return jobSequence
        } else {
            const priorityJob = jobDependency[1] // allocates priority job to const
            const nonPriorityJob = jobDependency[0] // and similar for non prioity job

            if(priorityJob === nonPriorityJob){ // if jobs are the same i.e. self dependent
                throw new Error('Jobs cannot depend on themselves')

            } else if(!jobSequence.includes(priorityJob) && !jobSequence.includes(nonPriorityJob)){ //if job sequence array that we are adding to 
                // doesn't contain the priority or non priority job
                console.log('jobSequence: ', [priorityJob, nonPriorityJob, ...jobSequence])
                return [...jobSequence, priorityJob, nonPriorityJob]  // adds job pair to front of array
            } else if(jobSequence.includes(priorityJob) && !jobSequence.includes(nonPriorityJob)) { // if job sequence contains the priority job only
                
                const elementsUptoIncludingPriorityJob = [...jobSequence.slice(0, jobSequence.indexOf(priorityJob) + 1)] // store jobs upto and including priority job
                const elementsAfterPriorityJob = [...jobSequence.slice(jobSequence.indexOf(priorityJob) + 1)] // store jobs after priority job
                console.log('jobSequence: ',[...elementsUptoIncludingPriorityJob, nonPriorityJob, ...elementsAfterPriorityJob])
                return [...elementsUptoIncludingPriorityJob, nonPriorityJob, ...elementsAfterPriorityJob] // put non priority job after priority job

            } else if(jobSequence.includes(nonPriorityJob) && !jobSequence.includes(priorityJob)) { // if job sequence contains the non priority job only
                
                const elementsUptoIncludingNonPriorityJob = [...jobSequence.slice(0, jobSequence.indexOf(nonPriorityJob))] // store jobs upto nonPriority job
                const elementsAfterNonPriorityJob = [...jobSequence.slice(jobSequence.indexOf(nonPriorityJob))] // store jobs after and including priority job
                console.log('jobSequence: ', [...elementsUptoIncludingNonPriorityJob, priorityJob, ...elementsAfterNonPriorityJob])
                return [...elementsUptoIncludingNonPriorityJob, priorityJob, ...elementsAfterNonPriorityJob] // put non priority job after priority job
                
            } else if (jobSequence.includes(priorityJob) && jobSequence.includes(nonPriorityJob)){ // else  the jobSequence contains both the non priority and piority job already
                
                    console.log('before cd error: ', jobSequence)
                    throw new Error('Jobs cannot have circular dependencies') //  there is a circular dependency issue
               
                
            }
        }
    },[])

    console.log('jobSequenceArray: ', jobSequenceArray)

    const finalJobSequenceArray = nonPriorityJobs.reduce((finalJobSequence, nonPriorityJob) => { //takes nonpriority jobs and combines them with the rest of the job sequence if not already allocated
        return finalJobSequence.includes(nonPriorityJob) ? finalJobSequence : [...finalJobSequence, nonPriorityJob]
    },jobSequenceArray)

    console.log('finaljobSequenceArray: ', finalJobSequenceArray.join(''))
    return finalJobSequenceArray.join('')
    
}


module.exports = { orderJobs }