
const jsonfile = require('jsonfile');
const packageFileSrc = './package.json';
let destitnationFile = null;


module.exports.init = function () {

    const nameSuffix = '-tmpl';
    const templateMetaObj = {};

    let packageName = null,
        packageVersion = null;



    function getTemplateNameAndVersion() {
        return jsonfile.readFile(packageFileSrc)
            .then(obj => {
                packageName = obj['name'] || null;
                packageVersion = obj['version'] || null;
                destitnationFile = "./dist/" + packageName + "/template-details.json";
                console.log(`******** Generating CUI template meta data for ${packageName + nameSuffix}  (Version ${packageVersion}) ******** 
                `);
            })
            .catch(error => console.error(error))
    };

    function setTemplateMeta() {
        if (packageName && packageVersion) {
            templateMetaObj['name'] = packageName + nameSuffix;
            templateMetaObj['version'] = packageVersion;
        }

    };

    function createtemplateMetaJsonFile() {
        if (destitnationFile) {
            jsonfile.writeFile(destitnationFile, templateMetaObj, { spaces: 2 }, function (err) {
                if (err) console.error(err)
            });
            console.log(`******** Template meta for ${packageName + nameSuffix} (${packageVersion}) generated successfully! ******** 
             `);

        }

    }


    getTemplateNameAndVersion().then(() => {
        setTemplateMeta();
        createtemplateMetaJsonFile();
    })
};

this.init();