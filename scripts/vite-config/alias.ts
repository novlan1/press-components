import * as fs from 'fs';
import * as path from 'path';

import type { Alias } from 'vite';

export function packagesPath() {
  return path.resolve(__dirname, '../../packages');
}

export function alias(): Alias[] {
  const projectPath = packagesPath();
  const dirArr = fs.readdirSync(projectPath);

  const result = dirArr.map(packagePath => ({
    find: new RegExp(`^()?press-${packagePath}(\\/(dist))?$`),
    replacement: path.join(projectPath, `/${packagePath}/index`),
  }));

  return result;
}
