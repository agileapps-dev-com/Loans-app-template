const jsonfile = require('jsonfile');
const packageFileSrc = './package.json';
let destitnationFile = null;

const nameSuffix = '-tmpl';
const templateMetaObj = {};

let packageName = null,
    packageVersion = null;


const templateMeta = {
    getTemplateNameAndVersion() {
        return jsonfile.readFile(packageFileSrc)
            .then(obj => {
                packageName = obj['name'] || null;
                packageVersion = obj['version'] || null;
                destitnationFile = "./dist/"+packageName+"/template-details.json"
            })
            .catch(error => console.error(error))
    },
    setTemplateMeta() {
        if (packageName && packageVersion) {
            templateMetaObj['name'] = packageName + nameSuffix;
            templateMetaObj['version'] = packageVersion;
        }

    },
    createtemplateMetaJsonFile() {
        if(destitnationFile){
            jsonfile.writeFile(destitnationFile, templateMetaObj, { spaces: 2 }, function (err) {
                if (err) console.error(err)
              })
        }

    }
}

module.exports.test = function () {

    // readTemplateVersion();
    templateMeta.getTemplateNameAndVersion().then(() => {
        templateMeta.setTemplateMeta();
        templateMeta.createtemplateMetaJsonFile();
    })
};
this.test();