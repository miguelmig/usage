export const envVarGenerator = {
  script: ['sh', '-c', 'env'],
  postProcess: (output) => {
    return output.split('\n').map(l => {name: l.split('=')[0]})
  }
}
export const usageGeneratorTemplate = (usage_cmd: String) => {
  return {
      script: usage_cmd.split(' '),
      postProcess: (output) => {
        
      }
    }
  }
}

export const 

export toolsGenerator = {

}

export const tasksGenerator = {

}