import * as path from 'path';
import * as fsPromises from 'fs/promises';

import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';

loadLanguages(['markup', 'css', 'javascript']);

const packagesPath = path.resolve(__dirname, '../../packages/');

const sourceCode = () => ({
  async transform(src: string, id: string) {
    const mdFile = '.md';
    if (!id.includes(mdFile)) return;

    const reg = /source-code="(.*)"/g;

    if (!src.match(reg)) return;

    const match = src.match(reg)?.map((_) => {
      const [packageName, compPath] = sourceSplit(_);
      console.log(packageName, compPath);
      const suffix = packageName.includes('ant') ? 'jsx' : 'vue';
      return fsPromises.readFile(path.resolve(packagesPath, `${packageName}/demo/${compPath}.${suffix}`), 'utf-8');
    }) as Promise<string>[];
    const filesRes = await Promise.all(match);

    let i = 0;
    return src.replace(reg, (str) => {
      const [packageName, compPath] = sourceSplit(str);
      const compPathStrArr = compPath.split('/');
      const iframeSrc = compPathStrArr[compPathStrArr.length - 1];
      const file = filesRes[i];
      i += 1;
      return `source-code="${encodeURIComponent(warp(Prism.highlight(file, Prism.languages.markup, 'markup')))}" raw-source="${encodeURIComponent(file)}" lib-type="${packageName}" iframe-src="${iframeSrc}"`;
    });
  },
});

const warp = (code: any) => `<pre v-pre><code>${code}</code></pre>`;

function sourceSplit(_: string) {
  const result = /.*?source-code="(.*)"/.exec(_);
  const originPath = result?.[1] ?? '';
  return originPath.split(':::');
}

export default sourceCode;
