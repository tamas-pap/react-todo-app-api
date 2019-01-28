const util = require('util');
const fs = require('fs');
const handlebars = require('handlebars');

const readFile = util.promisify(fs.readFile);

const renderTemplate = async (templatePath, context) => {
  const template = await readFile(templatePath, 'utf-8');
  const compiled = handlebars.compile(template);
  return compiled(context);
};

module.exports = renderTemplate;
