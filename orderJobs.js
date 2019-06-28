const orderJobs = (jobDependencies) => {
    if(jobDependencies === '') {
        return ''
    }

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
                // return [...jobSequence, 'sdError'] // adds error into sequence to be picked up later when out of reduce
                throw new Error('Jobs cannot depend on themselves')

            } else if(!jobSequence.includes(priorityJob) && !jobSequence.includes(nonPriorityJob)){ //if job sequence array that we are adding to 
                // doesn't contain the priority or non priority job
                return [priorityJob, nonPriorityJob, ...jobSequence]  // adds job pair to front of array
            } else if(jobSequence.includes(priorityJob) && !jobSequence.includes(nonPriorityJob)) { // if job sequence contains the priority job only
                
                const elementsUptoIncludingPriorityJob = [...jobSequence.slice(0, jobSequence.indexOf(priorityJob) + 1)] // store jobs upto and including priority job
                const elementsAfterPriorityJob = [...jobSequence.slice(jobSequence.indexOf(priorityJob) + 1)] // store jobs after priority job
                return [...elementsUptoIncludingPriorityJob, nonPriorityJob, ...elementsAfterPriorityJob] // put non priority job after priority job

            } else if(jobSequence.includes(nonPriorityJob) && !jobSequence.includes(priorityJob)) { // if job sequence contains the non priority job only
                
                const elementsUptoIncludingNonPriorityJob = [...jobSequence.slice(0, jobSequence.indexOf(nonPriorityJob))] // store jobs upto nonPriority job
                const elementsAfterNonPriorityJob = [...jobSequence.slice(jobSequence.indexOf(nonPriorityJob))] // store jobs after and including priority job
                return [...elementsUptoIncludingNonPriorityJob, priorityJob, ...elementsAfterNonPriorityJob] // put non priority job after priority job
            } else {
                // return [...jobSequence, 'cdError']
                throw new Error('Jobs cannot have circular dependencies')
            }
        }
    },[])

    console.log(jobSequenceArray)

    // if(jobSequenceArray.includes('sdError')){ // catches sdError or cdError message placed earlier in reduce
    //     return 'Error: Jobs cannot depend on themselves'
    // } else if(jobSequenceArray.includes('cdError')) {
    //     return 'Error: Jobs cannot have circular dependencies'
    // }

    console.log('jobSequenceArray: ', jobSequenceArray)

    const finalJobSequenceArray = nonPriorityJobs.reduce((finalJobSequence, nonPriorityJob) => { //takes nonpriority jobs and combines them with the rest of the job sequence if not already allocated
        return finalJobSequence.includes(nonPriorityJob) ? finalJobSequence : [...finalJobSequence, nonPriorityJob]
    },jobSequenceArray)

    console.log('finaljobSequenceArray: ', finalJobSequenceArray.join(''))
    return finalJobSequenceArray.join('')
    
}


module.exports = { orderJobs }