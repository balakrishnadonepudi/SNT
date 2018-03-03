
var SNTVersionNumber;



function checkVesrionNumberAndAssignIfNotAvail() {
    if (EMRVersionNumber)
        return true;
    else {

        if (EMRPracticeModel && hasValue(EMRPracticeModel.EHREasyFormsCommonJSFileName)) {
            EMRVersionNumber = EMRPracticeModel.EHREasyFormsCommonJSFileName.replace(/[^0-9]/g, "");
        }
        else {
            var founded;

            var scriptTags = $(document.getElementsByTagName("head")).find("script");

            for (var indexInItems = 0; indexInItems < scriptTags.length; indexInItems++) {
                if (hasValue(scriptTags[indexInItems])) {
                    if (hasValue($(scriptTags[indexInItems]).attr("src"))) {
                        if ($(scriptTags[indexInItems]).attr("src").indexOf("z1allmodulescripts") >= 0) {
                            founded = $(scriptTags[indexInItems]).attr("src");
                            break;
                        }
                    }
                }
            }

            if (hasValue(founded)) {

                founded = founded.substring(founded.indexOf("z1allmodulescripts") + "z1allmodulescripts".length, founded.indexOf(".js"));

                EMRVersionNumber = founded.replace(/[^0-9]/g, '');
            }

            else {
                if (adminGetGUID())
                    EMRVersionNumber = adminGetGUID();
                else
                    EMRVersionNumber = parseInt(Math.random() * 500);
            }
        }
        return true;
    }
}

function GetSNTPageURLByPageName(pageName) {

    return SNTApplicationPath + pageName + "?v=" + EMRVersionNumber;

    //if (checkVesrionNumberAndAssignIfNotAvail())
    //    return EMRApplicationPath + pageName + "?v=" + EMRVersionNumber;
}