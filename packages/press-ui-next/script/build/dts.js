const { execCommand } = require('t-comm');
const glob = require('glob');

function main() {
  const list = glob.sync('./{es,esm,lib,cjs}/**/press-*.vue.d.ts');
  list.forEach((file) => {
    const target = file.replace(/\.vue\.d\.ts/, '.d.ts');
    execCommand(`mv ${file} ${target}`, process.cwd(), 'inherit');
  });
}

main();
