const path = require('path');

const { batchSendWxRobotMarkdown, genVersionTip  } = require('t-comm');

function sendVersionTip(pwd) {
  const webhookUrl = 'PRESS_COMPONENTS_ROBOT___7c2fa492-bf95-482f-95e8-801ae243477d';
  console.log('webhookUrl: ', webhookUrl);

  const content = genVersionTip({
    appInfo: require(path.resolve(pwd, 'package.json')),
    showNpmLink: false,
    readmeFilePath: path.resolve(pwd, 'CHANGELOG.md'),
  });

  console.log('content:\n', content);

  batchSendWxRobotMarkdown({
    content,
    chatId: 'ALL',
    webhookUrl,
  });
}

module.exports = {
  sendVersionTip,
};

