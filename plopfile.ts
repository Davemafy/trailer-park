export default function (plop: any) {
  plop.setGenerator('context', {
    description: 'Generate a standard feature context and provider layout',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Enter context name (e.g., bookmarks, downloads):'
    }],
    actions: [
      {
        type: 'add',
        path: 'src/contexts/{{dashCase name}}-context/{{dashCase name}}-context.tsx',
        templateFile: 'plop-templates/context.tsx.txt'
      },
      {
        type: 'add',
        path: 'src/contexts/{{dashCase name}}-context/{{dashCase name}}-provider.tsx',
        templateFile: 'plop-templates/provider.tsx.txt'
      },
      {
        type: 'add',
        path: 'src/contexts/{{dashCase name}}-context/index.ts',
        templateFile: 'plop-templates/index.ts.txt'
      }
    ]
  });
}
