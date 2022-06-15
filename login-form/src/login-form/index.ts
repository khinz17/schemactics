import { apply, move, Rule, SchematicContext, SchematicsException, strings, Tree, url, template, mergeWith, MergeStrategy, chain } from '@angular-devkit/schematics';
import { normalize } from 'path';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function loginForm(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workSpace = getWorkSpace(_options, tree);
    const project = getProject(workSpace);
    const appRoot = `${project.root}/` + `${project.sourceRoot}/` + `${project.prefix}/`;
    const folderPath = normalize(strings.dasherize(appRoot + _options.path + '/' + _options.name));
    let files = url('./files/__name@dasherize__');

    const newTree = apply(files, [
      move(folderPath),
      template({
        ...strings,
        ..._options
      })
    ]);

    const templateRule = mergeWith(newTree, MergeStrategy.Default);
    const chainedRule = chain([templateRule]);

    return chainedRule(tree, _context);
  };
}

function getWorkSpace(_options: any, tree: Tree) {
  const workSpace = tree.read('/angular.json');

  if(!workSpace){
    throw new SchematicsException('angular.json file not found!');
  }

  return JSON.parse(workSpace.toString());
}

function getProject(workSpace: any){
  return workSpace.projects[workSpace.defaultProject];
}
