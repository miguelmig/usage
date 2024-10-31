export const envVarGenerator = {
  script: ['sh', '-c', 'env'],
  postProcess: (output) => {
    return output.split('\n').map(l => ({name: l.split('=')[0]}))
  }
}

export const singleCmdNewLineGenerator = (completion_cmd): Fig.Generator => ({
  script: completion_cmd.split(' '),
  splitOn: '\n'
})

export const singleCmdJsonGenerator = (cmd): Fig.Generator => ({
  script: cmd.split(' '),
  postProcess: (out) => JSON.parse(out).map(r => ({name: r.name, description: r.description}))
})



export const contextualGeneratorLastWord = (cmd): Fig.Generator => ({
  script: (context) => {
    if (context.length < 2) {
      return []
    }
    
    const prev = context[context.length - 2] // -1 is the current word
    return ['sh', '-c', cmd, prev]
  }
})

export const pluginGenerator: Fig.Generator = singleCmdNewLineGenerator('mise plugins --core --user')
export const allPluginsGenerator: Fig.Generator = singleCmdNewLineGenerator('mise plugins --all')
export const simpleTaskGenerator = singleCmdJsonGenerator('mise tasks -J')
export const settingsGenerator = singleCmdNewLineGenerator(`mise settings --keys`)
export const aliasGenerator: Fig.Generator = {
  ...contextualGeneratorLastWord('mise alias ls'),
  postProcess: (out) => {
    //return [{name: out}]
    //return out.split('\t').map(l => ({name: l}))
    //return [{name: "test", "description": out}]
    const tokens = out.split(' ') // TODO: Fix this, not working
    return tokens.map((_, i) => {
      if ((i % 3) == 0) {
        return [tokens[i], tokens[i+1], tokens[i+2]]
      }
    }).map(l => ({name: l}))
  }
}

export const miseConfigPathGenerator: Fig.Generator = {
  ...singleCmdJsonGenerator('mise config ls -J'),
  postProcess: (out) => JSON.parse(out).map(r => ({name: r.path, description: r.path}))
}

export const usageGeneratorTemplate = (usage_cmd: string) : Fig.Generator => {
  return {
    /*script: ["sh", "-c", `usage complete-word --shell bash -s "$$(${usage_cmd})"`],
    postProcess: (output) => {
      //return output.split('\n').map(l => { return {name: l} } )
      return [{name: output.slice(0, 20)}]
      return [{name: output.split("\n")[0].split(' ')[1]}]
    }
    */

    custom: async (tokens: string[], executeCommand) => {
      const { stdout: spec } = await executeCommand({
        command: 'sh', args: ['-c', usage_cmd]
      });

      const { stdout: completes } = await executeCommand({
        command: 'usage', args: ['complete-word', '--shell', 'bash', '-s', spec]
      })

      return completes.split('\n').map(l => ({name: l.trim(), type: 'special'}))
      
    }
  }
}

export const completionGeneratorTemplate = (argSuggestionBash: string): Fig.Generator => {
  return {
    //trigger: '@',
    //getQueryTerm: '@',

    custom: async (tokens: string[], executeCommand) => {
      let arg = argSuggestionBash;
      if (tokens.length >= 1) {
        arg = argSuggestionBash.replace("{{words[CURRENT]}}", tokens[tokens.length - 1])
      }

      if (tokens.length >= 2) {
        arg = arg.replace(`{{words[PREV]}}`, tokens[tokens.length - 2])
      }
      //return [{name: arg}]
      const {stdout: text} = await executeCommand({
        command: 'sh', args: ['-c', arg]
      });
      if (text.trim().length == 0) return []
      return text.split("\n").map((elm) => ({ name: elm }));
    }
  }
}
