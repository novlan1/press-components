import * as path from 'path';
import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentBasePath = () => path.resolve(__dirname, '../zh-CN/components');

const outPutBasePath = () => path.resolve(__dirname, '../.vitepress/pages');

const getComponentsSideBar = async (path: string) => {
  const resolvePath = componentBasePath() + path;

  const dirArr = await fsPromises.readdir(resolvePath);
  console.log('dirArr', dirArr);
  return Promise.all(dirArr.map(async (dirItemPath: string) => {
    const dirPath = `${resolvePath}/${dirItemPath}`;
    const fileArr = await fsPromises.readdir(dirPath);

    return {
      text: dirItemPath,
      collapsible: true,
      collapsed: false,
      items: await Promise.all(fileArr.map(async (fileName: string) => {
        const buffer = await fsPromises.readFile(`${dirPath}/${fileName}`);
        const fileStr = buffer.toString();
        const reg = /(?<=#\s).*?(?=\n)/;

        const sideName = reg.exec(fileStr) && (reg.exec(fileStr) as Array<string>)[0];
        return {
          text: sideName,
          link: `/zh-CN/components${path}/${dirItemPath}/${fileName.split('.')[0]}`,
        };
      })),
    };
  }));
};

const mdFilePath = [
  '/element-plus',
  '/tdesign-vue-next',
  // '/element-ui', '/ant-design'
];
let handled = false;

export default function sideBarPlugin() {
  return {
    buildStart: async () => {
      if (handled) {
        return;
      }
      handled = true;
      initSideBar();
    },
  };
}

export async function initSideBar() {
  for (const filePath of mdFilePath) {
    const sideBarArr = await getComponentsSideBar(filePath);
    const outPutFile = `${outPutBasePath()}/${filePath}.json`;
    await fsPromises.writeFile(outPutFile, JSON.stringify(sideBarArr), {
      encoding: 'utf-8',
    });
  }
}
