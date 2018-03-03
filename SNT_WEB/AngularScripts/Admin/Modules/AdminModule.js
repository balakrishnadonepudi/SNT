'use strict'

var SNTAdmin = angular.module('SNTAdmin', []);

SNTAdmin.value('$', $);


var EMRVersionNumber = 1;

var TestGithub = "";

var TestGithub2 = "";

var TestGithub3 = "";

var TestGithub4 = "";



function hasValue(inputValue) {
    if (inputValue != undefined && inputValue != null && inputValue.toString().length > 0)
        return true
    else return false;
}




function isError(responseObject) {
    //IF IT IS LIST THEN CHECK VALIDATIONS FROM FIRST ELEMENT
    if (hasValue(responseObject) && hasValue(responseObject.length) && responseObject.length > 0) {
        responseObject = responseObject[0];
    }
    if (responseObject != undefined && responseObject.RequestExecutionStatus != undefined && parseInt(responseObject.RequestExecutionStatus) < 0 && parseInt(responseObject.RequestExecutionStatus) != -3) {
        if (responseObject.ErrorMessage != undefined) {
            ShowErrorMessage(responseObject.ErrorMessage);
            return true;
        }
        else
            ShowErrorMessage("An Error Occurred While Processing Your Request, Please Contact Support Team for Further Assistance.");

        return true;
    }
    return false;
}

function isErrorOccured(responseObject) {
    //IF IT IS LIST THEN CHECK VALIDATIONS FROM FIRST ELEMENT
    if (hasValue(responseObject) && hasValue(responseObject.length) && responseObject.length > 0) {
        responseObject = responseObject[0];
    }
    if (responseObject != undefined && responseObject.RequestExecutionStatus != undefined && parseInt(responseObject.RequestExecutionStatus) < 0 && parseInt(responseObject.RequestExecutionStatus) != -3) {
        return true;
    }
    return false;
}

function showPageIsUnderConstruction() {
    alert("This Page is Under Construction");
}

String.prototype.contains = function (searchString) { return this.indexOf(searchString) != -1; };

String.prototype.startWith = function (prefix) {
    return this.indexOf(prefix) === 0;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

//==========================================================================   DATE TIME ==================================================
//GET WEEK BASED ON DATE
Date.prototype.getWeekStartAndEndDays = function (start) {
    //Calcing the starting point
    start = start || 0;  //0=sunday, 1=monday etc.
    var today = new Date(this.setHours(0, 0, 0, 0));
    var today1 = new Date(this.setHours(0, 0, 0, 0));
    var day = today.getDay() - start;
    var date = today.getDate() - day;

    // Grabbing Start/End Dates
    var StartDate = new Date(today.setDate(date));
    var EndDate = new Date(today1.setDate(date + 6));
    return [StartDate, EndDate];
}

Date.prototype.getMonthStartAndEndDays = function () {
    //Calcing the starting point
    var date = this;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [firstDay, lastDay];
}

Date.prototype.addDays = function (daysToAdd) {
    var inputdate = this;
    inputdate.setDate(inputdate.getDate() + daysToAdd);
    return inputdate
}

Date.prototype.addMonths = function (monthsToAdd) {
    var inputdate = this;
    inputdate.setMonth(inputdate.getMonth() + monthsToAdd);
    return inputdate
}

Date.prototype.addYears = function (yearToAdd) {
    var inputdate = this;
    inputdate.setFullYear(inputdate.getFullYear() + yearToAdd);
    return inputdate
}

Date.prototype.addHours = function (hoursToAdd) {
    var inputdate = this;
    inputdate.setHours(inputdate.getHours() + hoursToAdd);
    return inputdate
}

Date.prototype.addMinutes = function (minutesToAdd) {
    var inputdate = this;
    inputdate.setMinutes(inputdate.getMinutes() + minutesToAdd);
    return inputdate
}

Date.prototype.getFormat = function (format) {
    //https://github.com/phstc/jquery-dateFormat
    //yy = short year
    //yyyy = long year
    //M = month (1-12)
    //MM = month (01-12)
    //MMM = month abbreviation (Jan, Feb … Dec)
    //MMMM = long month (January, February … December)
    //d = day (1 - 31)
    //dd = day (01 - 31)
    //ddd = day of the week in words (Monday, Tuesday … Sunday)
    //E = short day of the week in words (Mon, Tue … Sun)
    //D - Ordinal day (1st, 2nd, 3rd, 21st, 22nd, 23rd, 31st, 4th…)
    //h = hour in am/pm (0-12)
    //hh = hour in am/pm (00-12)
    //H = hour in day (0-23)
    //HH = hour in day (00-23)
    //mm = minute
    //ss = second
    //SSS = milliseconds
    //a = AM/PM marker
    //p = a.m./p.m. marker

    //ex:MM/dd/yyyy  -  02/25/2015
    //ex:ddd, MMM dd yyyy - Monday, Feb 02 2015

    var inputdate = this;
    return $.format.date(inputdate, format);
}

Date.prototype.weekOfMonth = function (exact) {

    if (!hasValue(exact))
        exact = false

    var month = this.getMonth()
		, year = this.getFullYear()
		, firstWeekday = new Date(year, month, 1).getDay()
		, lastDateOfMonth = new Date(year, month + 1, 0).getDate()
		, offsetDate = this.getDate() + firstWeekday - 1
		, index = 1 // start index at 0 or 1, your choice
		, weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
		, week = index + Math.floor(offsetDate / 7)
    ;
    if (exact || week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;
}

Date.prototype.GetWeekFormat = function (givendate) {


    var currentdate = this;

    var WeekNo = currentdate.weekOfMonth(true);

    var WeekNames = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    var WeekName = WeekNames[WeekNo - 1] + " Wk";

    var month = currentdate.getMonth();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var monthName = monthNames[month];
    var year = currentdate.getFullYear();

    var strValueForFromDate = WeekName + " " + monthName + ", " + year;

    return strValueForFromDate;
}

//#########DATE TIME PROTO TYPES BLOCK END ##############


//#########DATE DIFFERENCE BLOCK START ##############
//REF:http://ditio.net/2010/05/02/javascript-date-difference-calculation/
//*******PURPOSE: This method is used to give the date differences between two dates
//*******CREATED BY: George D
//*******CREATED DATE: 08/01/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
var DateDiff = {

    inDaysWithTime: function (d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        if (t2 > t1)
            return parseInt((t2 - t1) / (60 * 1000) + 0.5);
        else
            return -1 * parseInt((t1 - t2) / (60 * 1000) + 0.5);
    },

    inMins: function (d1, d2) {
        //var timeStart = new Date(d1).getTime();
        //var timeEnd = new Date(d2).getTime();
        //var hourDiff = timeEnd - timeStart; //in ms        
        //return (hourDiff / 60 / 1000) - 60 * Math.floor(hourDiff / 3600 / 1000);
        var minutes;
        var oToday = new Date(d1);
        var oDatePublished = new Date(d2);
        var nDiff = oToday.getTime() - oDatePublished.getTime();
        minutes = Math.floor(nDiff / 1000 / 60);
        // nDiff -= oResult.minutes * 1000 * 60;
        return minutes;
    },

    inHours: function (d1, d2) {
        var timeStart = new Date(d1).getTime();
        var timeEnd = new Date(d2).getTime();
        var hourDiff = timeEnd - timeStart; //in ms  
        return Math.floor(hourDiff / 3600 / 1000);//retutrns no.of hrs
    },

    inSeconds: function (d1, d2) {
        var timeStart = new Date(d1).getTime();
        var timeEnd = new Date(d2).getTime();
        var hourDiff = timeEnd - timeStart; //in ms
        return (hourDiff / 1000) - 60 * 60 * Math.floor(hourDiff / 3600 / 1000);;
    },

    inDays: function (d1, d2) {
        d1 = new Date((new Date(d1)).setHours(0, 0, 0, 0));
        d2 = new Date((new Date(d2)).setHours(0, 0, 0, 0));
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        if (t2 > t1)
            return parseInt((t2 - t1) / (24 * 3600 * 1000) + 0.5);
        else
            return -1 * parseInt((t1 - t2) / (24 * 3600 * 1000) + 0.5);
    },

    inWeeks: function (d1, d2) {

        d1 = new Date((new Date(d1)).setHours(0, 0, 0, 0));
        d2 = new Date((new Date(d2)).setHours(0, 0, 0, 0));

        var t2 = d2.getTime();
        var t1 = d1.getTime();

        if (t2 > t1)
            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7) + 0.5);
        else
            return -1 * parseInt((t2 - t1) / (24 * 3600 * 1000 * 7) + 0.5);
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
}


function DateDiffInMins(d1, d2) {
    var minutes;
    var oToday = new Date(d1);
    var oDatePublished = new Date(d2);
    var nDiff = oToday.getTime() - oDatePublished.getTime();
    minutes = Math.floor(nDiff / 1000 / 60);
    // nDiff -= oResult.minutes * 1000 * 60;
    return minutes;
}

function DateDiffInDays(d1, d2) {

    var days;
    var oToday = new Date(d1);
    var oDatePublished = new Date(d2);
    var nDiff = oToday.getTime() - oDatePublished.getTime();
    days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
    // nDiff -= oResult.minutes * 1000 * 60;
    return days;
}



var adminCurrentDateAndTme;


//#########TIMER TO GET CURENT DATE AND TIME BLOCK START ##############
//*******PURPOSE: This method is used to increase the time for every second. 
//if adminCurrentDateAndTme has no data in it then get the data from wcf service.
//and then increase the time for every secon for further usage
//*******CREATED BY: George D
//*******CREATED DATE: 07/28/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function adminCurrentDateAndTmeTimer() {
    adminCurrentDateAndTme = new Date(adminCurrentDateAndTme.setSeconds(adminCurrentDateAndTme.getSeconds() + 1));
}


//starting datetime timer for updating time for every second
function startDateTimeTimer() {
    var varAdminDateTime = setInterval(function () { adminCurrentDateAndTmeTimer(); }, 1000);
}

//#########TIMER TO GET CURENT DATE AND TIME BLOCK END ##############


//this method is useful in getting the current date and time in required format
function adminGetCurrentDateTime_Client() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (1 + currentDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = currentDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    // get Time 
    var h = currentDate.getHours(), m = currentDate.getMinutes();
    var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');

    return (month + '/' + day + '/' + year) + ' ' + _time;
}



//#########GET CURENT DATE AND TIME IN DIFFERENT FORMATS BLOCK START ##############
//*******PURPOSE: This method is used to get the current date
//*******CREATED BY: George D
//*******CREATED DATE: 07/28/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function adminGetCurrentDateAndTme() {

    return new Date(adminCurrentDateAndTme);
}

function adminGetCurrentDate() {
    //Format: 07/28/2014
    return $.format.date(adminCurrentDateAndTme, "MM/dd/yyyy");
}

function adminGetCurrentTimeWithSec() {
    //Format: 03:10:15 PM
    return $.format.date(adminCurrentDateAndTme, "hh:mm:ss a");
}


function adminGetCurrentTime24HoursFormat() {
    //Format: 15:10:15
    return $.format.date(adminCurrentDateAndTme, "HH:mm:ss");
}

function adminGetCurrentDateAndTime() {
    //Format: 07/28/2014 03:10:15 PM
    return $.format.date(adminCurrentDateAndTme, "MM/dd/yyyy hh:mm:ss a");
}

function adminGetCurrentDateAndTimeWithoutSecs() {
    //Format: 07/28/2014 03:10 PM
    return $.format.date(adminCurrentDateAndTme, "MM/dd/yyyy hh:mm a");
}

function adminGetCurrentTime() {
    //Format: 03:10 PM
    return $.format.date(adminCurrentDateAndTme, "hh:mm a");
}

function adminGetOnlyTime(input) {
    var date = new Date(input);
    //Format: 03:10 PM
    return $.format.date(date, "hh:mm a");
}

function adminGetCurrentYear() {
    //Format 2016
    return $.format.date(adminCurrentDateAndTme, "yyyy");
}


//######### GET THE DATES BEFORE AND AFTER N DAYS BLOCK START ##############
//*******PURPOSE: This method is used to get the  date before and after n days with the given input date
//*******CREATED BY: MAEHSH P
//*******CREATED DATE: 07/28/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//this method returns the date before the 'n' days from the given input date
function adminGetDateBeforeNDays(date, n) {
    var inputdate = new Date(date);
    inputdate.setDate(inputdate.getDate() - n);
    return $.format.date(inputdate, "MM/dd/yyyy");
}
//this method returns the date after the 'n' days from the given input date
function adminGetDateAfterNDays(date, n) {
    var inputdate = new Date(date);
    inputdate.setDate(inputdate.getDate() + n);
    return $.format.date(inputdate, "MM/dd/yyyy");
}
//######### GET THE DATES BEFORE AND AFTER N DAYS BLOCK START ##############


//######### GET THE RANDOM NUMBER AND UNIQUED ID BLOCK START ##############
//*******PURPOSE: These methods arfe used in generating the randomly caluculated number and generating the Unique ID's
//*******CREATED BY: MAEHSH P
//*******CREATED DATE: 02/14/2015
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//this method returns the randomly generated number
function adminGetRandomNumber() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);// then to call it, plus stitch in '4' in the third group
}


function adminGetGUID() {
    return ("emr-" + adminGetRandomNumber() + adminGetRandomNumber() + "-" + adminGetRandomNumber() + "-" + adminGetRandomNumber().substr(0, 3) + "-" + adminGetRandomNumber() + "-" + adminGetRandomNumber() + adminGetRandomNumber() + adminGetRandomNumber()).toLowerCase();//this method returns the created GUID 
}





function validateDate(dateInputBox, event) {

    // return;//added by mahesh p since //Do not append Slashes (/) automatically when DOB is entering requirement from client


    //this line was added by mahesh p for allowing navigation keys
    if (jsIsUserFriendlyCharKeyDown(event.keyCode)) return true;

    //if (event.keyCode == 8 || event.keyCode == 46) {
    //    //allowing backspace and delete keys
    //    return true;
    //}




    if (dateInputBox == undefined) return ''; //if object is undefined then return

    var inputValue = dateInputBox.value; // getting date input value from input box

    inputValue = inputValue.replace(/[^\d^\/]/g, "");

    var dateParts = inputValue.split('/'); //spliting with '/' to get month,date and year seperately

    var month = "", date = "", year = ""; //initializing variables


    //getting month part and do the manipulations
    if (dateParts.length > 0) {
        if (parseInt(dateParts[0]) > 12)
            month = dateParts[0].substring(0, 1)
        else {
            month = dateParts[0];

            if (dateParts.length > 1 && month.length == 1) {
                month = "0" + month;
            }
        }

    }


    //getting date part and do the manipulations
    if (dateParts.length > 1) {
        if (parseInt(dateParts[1]) > 31)
            date = dateParts[1].substring(0, 1)
        else {
            date = dateParts[1];

            if (dateParts.length > 2 && date.length == 1) {
                date = "0" + date;
            }
        }
    }


    //getting year part and do the manipulations
    if (dateParts.length > 2) {
        if (parseInt(dateParts[2]) > 9999)
            year = dateParts[2].substring(0, 4)
        else
            year = dateParts[2];
    }

    var transformedInput = "";

    //getting month
    if (month.length > 0)
        transformedInput = month;

    //appending '/' after month
    if (month.length == 2 || dateParts.length > 1)
        transformedInput += "/";

    //getting date
    if (date.length > 0)
        transformedInput += date;

    //appending '/' after date
    if (date.length == 2 || dateParts.length > 2)
        transformedInput += "/";

    //getting year
    if (year.length > 0)
        transformedInput += year;

    //replacing resultant date in entry field
    if (transformedInput != dateInputBox.value) {
        dateInputBox.value = transformedInput
    }

    //TO AVOID // IN INPUT
    if (dateInputBox.value.indexOf("//") >= 0) {
        dateInputBox.value = dateInputBox.value.replace(/\/\//g, "/");
    }

    //added since some times ngmodel is not updating so firing the change event since watcher is fired
    $(dateInputBox).trigger('change');

}

function validateDateNew(txtSender, event) {

    if (txtSender.value.EndsWith("/") && e.KeyChar == "/") {
        e.Handled = true;
    }

    if (txtSender.value.IndexOf("/") != txtSender.value.LastIndexOf("/") && e.KeyChar == "/") {
        e.Handled = true;
    }

    if (txtSender.value.Length == 2 && e.KeyChar != "/" && txtSender.value.IndexOf("/") == txtSender.valueLastIndexOf("/")) {
        txtSender.AppendText("/");
    } else if (txtSender.value.Length == 5 && e.KeyChar != "/" && txtSender.value.IndexOf("/") == txtSender.value.LastIndexOf("/")) {
        txtSender.AppendText("/");
    }
    //'***************************************
    if (e.KeyChar == Strings.Chr(47) & !string.IsNullOrEmpty(this.value)) {
        if (this.value.Length == 1) {
            this.value = this.value.Insert(0, "0");
        } else if (this.value.Length == 4) {
            this.value = this.value.Insert(3, "0");
        }
        this.SelectionStart = this.value.Length;
        return;
    }
    if (!(e.KeyChar == Strings.Chr(8)) && !(e.KeyChar == Strings.Chr(13))) {
        if (txtSender.SelectedText.Trim.Length == 0) {
            if (Information.IsNumeric(e.KeyChar) == false) {
                e.Handled = true;
            }
        }
    }

    //=======================================================
    //Service provided by Telerik (www.telerik.com)
    //Conversion powered by NRefactory.
    //Twitter: @telerik
    //Facebook: facebook.com/telerik
    //=======================================================

}
//*******PURPOSE: This method is used to validate date while leaving entry field
//Example of calling: onblur="validateDateOnLeave(this);"
//*******CREATED BY: George D
//*******CREATED DATE: 11/19/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateDateOnLeave(dateInputBox) {
    var d = dateInputBox.value;

    if (!hasValue(d)) return true;

    var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!validformat.test(d)) {
        ShowErrorMessage('Please Enter Date in MM/DD/YYYY Format.');
        dateInputBox.focus();
        return false;
    }
    var mth = d.split("/")[0]
    var day = d.split("/")[1]
    var yr = d.split("/")[2]
    var bday = new Date(yr, mth - 1, day)
    if ((bday.getMonth() + 1 != mth) || (bday.getDate() != day) || (bday.getFullYear() != yr) || bday.getFullYear() < 1900 || bday.getFullYear() > 2099) {
        ShowErrorMessage("Invalid Day, Month, or Year Range Detected.");
        dateInputBox.focus();
        return false;
    }

    return true;

}
//allowing only numerics
function isNumericKeyDown(e) {
    var evt = (e) ? e : window.event;
    var key = (evt.keyCode) ? evt.keyCode : evt.which;
    if (key != null) {
        key = parseInt(key, 10);
        if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
            if (!jsIsUserFriendlyCharKeyDown(key, "Numbers")) {
                return false;
            }
        }
        else {
            if (evt.shiftKey) {
                return false;
            }
        }
    }
    return true;
}

function validatePhoneOnLeave(PhoneInputBox) {
    var d = PhoneInputBox.value;

    if (!hasValue(d)) return true;

    //var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!EMRPhoneNumberRegEx.test(d)) {
        ShowErrorMessage("Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111");
        PhoneInputBox.focus();
        return false;
    }
    if (d.trim().indexOf(0) == '1' && d.trim().replace('-', '').length < 11) {
        ShowErrorMessage("Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111");
        PhoneInputBox.focus();
        return false;
    }
    if (d.trim().indexOf(0) != '1' && d.trim().replace('-', '').length < 10) {
        ShowErrorMessage("Please Enter Valid Phone / Fax Number.<br> Example:111-111-1111 (or)1111-111-1111");
        PhoneInputBox.focus();
        return false;
    }

    return true;

}


//######### PHONE/FAX VALIDATION BLOCK END ##############

//######### ZipCode VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate ZipCode number
//*******CREATED BY: Afroz
//*******CREATED DATE: 4/23/2015
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateZipCodeOnLeave(ZipCodeInputBox) {
    var d = ZipCodeInputBox.value;

    if (!hasValue(d)) return true;

    //var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!EMRZipCodeRegEx.test(d)) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        ZipCodeInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length < 5) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        ZipCodeInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length > 5 && d.trim().replace('-', '').length < 9) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        ZipCodeInputBox.focus();
        return false;
    }

    return true;

}


function validateZipCode(ZipCodeInfo) {
    var d = ZipCodeInfo;

    if (!hasValue(d)) return true;

    //var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!EMRZipCodeRegEx.test(d)) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        //ZipCodeInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length < 5) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        //ZipCodeInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length > 5 && d.trim().replace('-', '').length < 9) {
        ShowErrorMessage("Please Enter Valid ZIP Code.<br> Example:12345 (or)12345-6789");
        //ZipCodeInputBox.focus();
        return false;
    }

    return true;

}



//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function changetoTitleCase(stringtoConvert) {
    if (!hasValue(stringtoConvert)) return;
    return stringtoConvert.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
//######### CHAGE WORD TO TITLE CASE BLOCK END ##############


//######### SSN NUMBER VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate SSN number
//*******CREATED BY: PHANI KUMAR M
//*******CREATED DATE: 8/1/2015
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateSSNOnLeave(SsnInputBox) {
    var d = SsnInputBox.value;

    if (!hasValue(d)) return true;

    //var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!EMRSSNRegEx.test(d)) {
        ShowErrorMessage("Please Enter Valid SS Number .<br> Example:123-45-6789");
        SsnInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length < 3) {
        ShowErrorMessage("Please Enter Valid SS Number .<br> Example:123-45-6789");
        SsnInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length > 3 && d.trim().replace('-', '').length < 5) {
        ShowErrorMessage("Please Enter Valid SS Number .<br> Example:123-45-6789");
        SsnInputBox.focus();
        return false;
    }
    if (d.trim().replace('-', '').length > 5 && d.trim().replace('-', '').length < 9) {
        ShowErrorMessage("Please Enter Valid SS Number .<br> Example:123-45-6789");
        SsnInputBox.focus();
        return false;
    }
    return true;
}

//*******PURPOSE: This method is used to validate date while on calling
//Example of calling: validateDateOnDemand(date)
//*******CREATED BY: Mahesh P
//*******CREATED DATE: 12/17/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateDateOnDemand(dateInput) {
    var d = dateInput;

    if (!hasValue(d)) return false;//if no date is given as input

    var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!validformat.test(d)) {
        return false;//if the date format is not satisfied with the reg ex
    }
    var mth = d.split("/")[0]
    var day = d.split("/")[1]
    var yr = d.split("/")[2]
    var bday = new Date(yr, mth - 1, day)
    if ((bday.getMonth() + 1 != mth) || (bday.getDate() != day) || (bday.getFullYear() != yr) || bday.getFullYear() < 1900 || bday.getFullYear() > 2099) {
        return false;
    }

    return true;

}

//#########DATE VALIDATION BLOCK END ##############

//*******PURPOSE: This method is used to validate date while on calling
//Example of calling: validateDateOnDemand(date)
//*******CREATED BY: Mahesh P
//*******CREATED DATE: 12/17/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateDateOnDemandNew(dateInput, strValue) {
    var d = dateInput;

    if (!hasValue(d))
        return false;//if no date is given as input

    var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!validformat.test(d)) {
        return false;//if the date format is not satisfied with the reg ex
    }
    var mth = d.split("/")[0]
    var day = d.split("/")[1]
    var yr = d.split("/")[2]
    var bday = new Date(yr, mth - 1, day)
    if ((bday.getMonth() + 1 != mth) || (bday.getDate() != day) || (bday.getFullYear() != yr) || bday.getFullYear() < 1900 || bday.getFullYear() > 2099) {
        return false;
    }

    return true;

}

//#########DATE VALIDATION BLOCK END ##############


//*******PURPOSE: This method is used to validate date while on calling
//*******Above methods doesn't work for the some dates(ex:- 1/01/2011(above method only supports 01/01/2011 date as this is in MM/dd/YYYY format)) 
//*******CREATED BY: afroz
//*******CREATED DATE: 4/07/2016
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function isValidDate(date) {
    if (!hasValue(date))
        return false;

    var valid = true;

    date = date.replace('/-/g', '');

    var month = parseInt(date.substring(0, 2), 10);
    var day = parseInt(date.substring(2, 4), 10);
    var year = parseInt(date.substring(4, 8), 10);

    if ((month < 1) || (month > 12)) valid = false;
    else if ((day < 1) || (day > 31)) valid = false;
    else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
    else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
    else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;
    else if ((month == 2) && (day > 28)) valid = false;

    return valid;
}

//#########DATE VALIDATION BLOCK END ##############


//#########EMAIL VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate email address while leaving entry field
//Example of calling: onblur="validateEmail(this);"
//*******CREATED BY: George D
//*******CREATED DATE: 11/19/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateEmail(emailInputBox) {
    var emailText = emailInputBox.value;
    if (!hasValue(emailText)) {

        if (hasValue(emailInputBox) && hasValue($(emailInputBox).siblings()))
            $(emailInputBox).siblings().removeClass("entypo-cross3 wrongIcon icomoon-checkmark-circle rightIcon");
        return true;
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailText)) {
        if (hasValue(emailInputBox) && hasValue($(emailInputBox).siblings()) && hasValue($(emailInputBox).siblings().hasClass('ehremailvalidation')) && $(emailInputBox).siblings().hasClass('ehremailvalidation') == true) {
            var argsData = {
                EmailAddress: emailText,
                event: emailInputBox,
            };
            //when clicked on enter key sending the message 
            $(document).trigger("ehrRealTimeEmailValidation", argsData);
        }
        return true;
    }
    else {
        ShowErrorMessage("Please Enter valid E-Mail.");
        emailInputBox.focus();
        if (hasValue(emailInputBox) && hasValue($(emailInputBox).siblings()) && hasValue($(emailInputBox).siblings().hasClass('ehremailvalidation')) && $(emailInputBox).siblings().hasClass('ehremailvalidation') == true) {
            $(emailInputBox).parent().css("display", "flex");
            $(emailInputBox).siblings().removeClass("entypo-cross3 wrongIcon icomoon-checkmark-circle rightIcon");
            $(emailInputBox).siblings().addClass("entypo-cross3 wrongIcon");
        }
        return false;
    }
    return true;
}

//#########EMAIL VALIDATION BLOCK END ##############

//######### COUNTRY CODE VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate country code
//Example of calling: onblur="validateCountryCode(this);"
//*******CREATED BY: Lakshmi B
//*******CREATED DATE: 11/20/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateCountryCode(countryCodeInputBox) {
    var CountryCode = countryCodeInputBox.value;
    if (!hasValue(CountryCode)) return true;
    var re = /^(US|CA|MX)$/;
    if (re.test(CountryCode.toUpperCase())) {
        return true;
    }
    else {
        ShowErrorMessage("Country Should Contain Only Country Codes.For Ex:- US/CA/MX");
        countryCodeInputBox.focus();
        return false;
    }
    return true;
}

//######### COUNTRY CODE VALIDATION BLOCK END ##############

//######### STATE CODE VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate country code
//Example of calling: onblur="validateStateCode(this);"
//*******CREATED BY: Afroz
//*******CREATED DATE: 3/7/2015
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//function validateStateCode(stateCodeInputBox) {
//    var StateCode = stateCodeInputBox.value;
//    if (!hasValue(StateCode)) return true;
//    var re = /^(OH|AL|NY)$/;//OH AL NY
//    if (re.test(StateCode.toUpperCase())) {
//        return true;
//    }
//    else {
//        ShowErrorMessage("State Should Contain Only State Codes.For Ex:- OH/AL/NY");
//        stateCodeInputBox.focus();
//        return false;
//    }
//    return true;
//}

// THIS CODE IS INSERTED AFTER CONFIRMATION OF SUGANDH GARU UNDER AFROZ GUIDANCE
//*******PURPOSE: This method is used to validate country code
//Example of calling: onblur="validateStateCode(this);"
//*******CREATED BY: PAVAN KUMAR BHARIDE
//*******CREATED DATE: 11/04/2016
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateStateCode(stateCodeInputBox) {
    var StateCode = stateCodeInputBox.value;
    if (!hasValue(StateCode)) return true;
    var StateRegularExp = /^(A[LKSZRAP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])|()$/;
    var isPatternMatch = StateRegularExp.exec(StateCode.toUpperCase());
    if (isPatternMatch[1] == undefined || isPatternMatch[1] != StateCode.toUpperCase()) {
        ShowErrorMessage("State Should Contain Only State Codes.For Ex:- OH/AL/NY");
        stateCodeInputBox.focus();
        return false;

    }
    else return true;
}

//######### STATE CODE VALIDATION BLOCK END ##############


//######### ALPHA NUMERIC AND SOME SPECIAL CHARACTERS VALIDATION BLOCK START ##############

//*******PURPOSE: This method is used to validate that the field value contain alphanumeric and some special characters 
//Example of calling: onblur="validateAlphaNumericandSpecialCharsCode(this);"
//*******CREATED BY: Lakshmi B
//*******CREATED DATE: 11/20/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateAlphaNumericandSpecialCharsCode(InputBox) {
    var stringValue = InputBox.value;
    if (!hasValue(stringValue)) return true;
    var re = /^[ A-Za-z0-9'\-().,#:/@_%]*$/;
    if (re.test(stringValue)) {
        return true;
    }
    else {
        if (InputBox.id == "txtExtraname") {
            ShowErrorMessage("Extra Name Should Contain Only alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }
        else if (InputBox.id == "txtLastName") {
            ShowErrorMessage("Last Name Should Contain Only Alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }
        else if (InputBox.id == "txtMiddleName") {
            ShowErrorMessage("Middle Name Should Contain Only Alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }
        else if (InputBox.id == "txtStreet1") {
            ShowErrorMessage("Street1 Should Contain Only Alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }
        else if (InputBox.id == "txtStreet2") {
            ShowErrorMessage("Street2 Should Contain Only Alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }
        else if (InputBox.id == "txtCity") {
            ShowErrorMessage("City Should Contain Only Alphabets, Numeric and '().,#:/-@_%");
            InputBox.focus();
            return false;
        }

    }
    return true;
}

//######### ALPHA NUMERIC AND SOME SPECIAL CHARACTERS VALIDATION BLOCK END ##############



//*******PURPOSE: This method is used to validate that the field value contain alphanumeric Values
//Example of calling: onblur="validateAlphaNumerics(this);"
//*******CREATED BY: Lakshmi B
//*******CREATED DATE: 11/20/2014
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function validateAlphaNumerics(InputBox) {
    var stringValue = InputBox.value;
    if (!hasValue(stringValue)) return true;
    var re = /^[A-Za-z0-9]+$/;

    if (!re.test(stringValue)) {
        ShowErrorMessage("Enter Only Alphabets and Numeric Values.");
        InputBox.focus();
        return false;
    }

    return false;
}



function validateAllSpecialCharacters(stringValue) {
    //var stringValue = InputBox.value;
    if (!hasValue(stringValue)) return true;
    //var re = /^[ A-Za-z0-9'\-().,#:/]*$/;
    var re = /^[a-zA-Z0-9]*$/;
    if (!re.test(stringValue)) {
        //InputBox.focus();
        return false;
    }
}



var adminBrowserDetails = "";

function adminGetBrowserDetails() {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
        // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
        // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
        // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
        // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
        // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
		(verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    adminBrowserDetails = 'Browser name  = ' + browserName + '<br>'
		+ 'Full version  = ' + fullVersion + '<br>'
		+ 'Major version = ' + majorVersion + '<br>'
		+ 'navigator.appName = ' + navigator.appName + '<br>'
		+ 'navigator.userAgent = ' + navigator.userAgent + '<br>';
}

adminGetBrowserDetails();
//###############BROWSER DETAILS BLOCK END########################

function adminDateInStringFormat(inputDate) {
    return $.format.date(new Date(inputDate), "MM/dd/yyyy hh:mm:ss a")
}

function adminGetDateInyearFormat(InputDate) {
    var date = new Date(InputDate);
    return $.format.date(date, "yyyy");
}


var adminIsDevice = function () {
    return ($(window).width() < 1024)
}

var adminIsChromeBook = function () {
    return $(window).width() > 1024 && $(window).width() <= 1368;
}

var adminIsTabletLandscape = function () {
    return $(window).width() <= 1024
}

var adminIsTabletPortrait = function () {
    return $(window).width() <= 991 && $(window).width() >= 998
}


// ======================= ARRAY PROTOTYPES BLOCK =======================================
// USED TO FIND ITEM FROM ARRAY LIST
Array.prototype.findItem = function (property, value) {
    for (var index = 0; index <= this.length - 1; index++) {
        if (this[index][property] == value) {
            return true
        }
    }
    return false;
}

// USED TO REMOVE ITEM FROM ARRAY LIST
Array.prototype.removeItem = function (property, value) {
    for (var index = 0; index <= this.length - 1; index++) {
        if (this[index][property] == value) {
            this.splice(index, 1);
        }
    }
}


/* =========== ARRAY SORTING BLOCK START ============== */
//*******PURPOSE: THIS METHOD IS USED TO ASSIGN ENUMERATOR FOR EACH MODULE WHICH IS USED TO ADD/EDIT/DELETE/ GET COMMONLY USED DELETE REASONS LIST BASED ON POP UP USED 
//*******CREATED BY: MAHESH P
//*******CREATED DATE: 08/26/2015
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//this method is useful in sorting the json array with the given input key and direction
//default sort order is ascending 
//if direction is sent except false,0 then it is descending order sorting
//ex : people.sortByKey('name', 1);// desc otherwise, default - 0/ asc
Array.prototype.sortByKey = function (key, dir) {
    if (this.length > 0) {
        if (dir) {
            this.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        else {
            this.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
    }
};



$.unique = function (array) {
    if (hasValue(array)) {
        return $.grep(array, function (el, index) {
            return index == $.inArray(el, array);
        });
    } else {
        return array;
    }
}


//example : stingvariable.trimEnd("cc");
String.prototype.trimEnd = function (char) {

    if (char != null && char != undefined && char != "") {

        if (this.lastIndexOf(char) == this.length - char.length)
            return this.substring(0, this.lastIndexOf(char));
        else
            return this;
    }
    else
        return this;
};
// =========== METHOD TO TRIM THE END OF THE STRING BLOCK END ==============

// =========== METHOD TO TRIM THE START OF THE STRING BLOCK START ==============
//*******PURPOSE: THIS METHOD IS USEFUL IN TRIMMING THE STRING AT THE START POSITION WHICH CHAR INPUT WAS FOUND START IN THE INPUT STRING
//*******CREATED BY: PRASAD BABU
//*******CREATED DATE: 06/17/2016
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//example : ORIGINAL TEXT = CCCCCCABCD;  stingvariable.trimStart("C"); >> output : ABCD
String.prototype.trimStart = function (inputchar) {

    var returnstring = "";

    //GET ORIGINAL STRING INTO A VARIBALE
    returnstring = this;

    if (inputchar != null && inputchar != undefined && inputchar != "") {

        if (hasValue(this) && this.length > 0) {

            // WHEN DO TRIMSTART WE NEED TO REMOVE THE INPUT GIVEN STRING IN ALL STARTING OCCURANCES OF ORIGINAL STRING VALUE. SO LOOPING AND REMOVING IT FROM STARTING OF THE STRING
            for (var ch = 0; ch < this.length; ch++) {
                // IF ORIGINAL STRING STARTS WITH INPUT GIVEN TEXT THEN REMOVE IT FROM STRING
                if (hasValue(returnstring) && returnstring.startsWith(inputchar)) {
                    returnstring = returnstring.substring(inputchar.length);
                }
                else {
                    break;
                }

            }
            return returnstring;
        }
        else
            return returnstring;

    }
    else
        return returnstring;
};
// =========== METHOD TO TRIM THE END OF THE STRING BLOCK END ==============







// =========== METHOD TO RETURN COUNT OF NUMBER OF OOCCURENCES OF A STRING BLOCK START ==============
//*******PURPOSE: THIS METHOD IS USEFUL TO GET COUNT OF TOTAL NO OF OCCURRENCES OF A STRING FROM A PARTICUALR STRING
//*******CREATED BY: UDAY KIRAN V
//*******CREATED DATE: 08/09/2016
//*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


String.prototype.stringTotalOccurrenceCount = function (strMatchString) {
    if (!hasValue(strMatchString)) return;
    return (this.length - this.replace(new RegExp(strMatchString, "g"), '').length) / strMatchString.length;
}
// =========== METHOD TO RETURN COUNT OF NUMBER OF OOCCURENCES OF A STRING BLOCK END ==============



var EHRisMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iOSPhone: function () {
        return navigator.userAgent.match(/iPhone/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (EHRisMobile.Android() || EHRisMobile.BlackBerry() || EHRisMobile.iOS() || EHRisMobile.Opera() || EHRisMobile.Windows());
    },
    anyMobile: function () {
        return (EHRisMobile.Android() || EHRisMobile.BlackBerry() || EHRisMobile.iOSPhone() || EHRisMobile.Opera() || EHRisMobile.Windows());
    },
    iOSIpad: function () {
        return navigator.userAgent.match(/iPad|iPod/i);
    },
};


Array.prototype.sortByKey = function (key, dir) {
    if (this.length > 0) {
        if (dir) {
            this.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        else {
            this.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
    }
};


function autoSizeTextArea(obj) {
    try {

        if (hasValue(obj) && $(obj).prop("tagName").toString().toLowerCase() == "textarea") {

            var previousHeight = obj.style.height;
            if (previousHeight == "")
                previousHeight = 0;
            else
                previousHeight = parseInt(previousHeight);

            obj.style.height = 'auto';//setting the height as auto
            obj.style.height = obj.scrollHeight + 'px';//setting the height of the text box as the scroll height

        }
    }
    catch (ex) {
    }
}

//THIS IS FOR PREVENTING THE OPENING OF THE CONSOLE OR THE DEBUGGING WINDOW BY PLACING THE FOCUS ON THE CONTROL OF OUR APPLICATION
//MAINING THIS IS DONE WHEN WE ARE SCANNING THE INFORMATION FROM THE SCANNER AND POPULATING IN THE TEXT BOX THEN CONSOLE WINDOW IS OPENING
//SO TO SOLVE THAT PROBLEM THIS IS USED
$(document).keydown(function (event) {
    if (event.keyCode == 123) {
        return false;
    }
});


//added by mahes p on 11/28/2016 for getting the current day existence of the week in the month
Date.prototype.getMonthWeek = function () {
    //var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    //return Math.ceil((this.getDate() + firstDay) / 7);
    return Math.floor((this.getDate() - 1) / 7) + 1;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



////////#############				COPY TO CLIPBOARD FOR IMAGES BLOCK START			###############
////////LISTENTING TO THE ANY COPY TO CLIP BOARD EVENTS 
//////$(document).on("copytoclipboard", function (event, args) {
//////    //COPYING THE OBJECTS
//////    makeTheCurrentElementCopy(args);
//////});

////////$(window).on("copytoclipboard", function (event, args) {
////////	debugger;
////////	makeTheCurrentElementCopy(args);
////////});

////////THIS VARIABLE IS USEFUL IN HOLDING THE COPYING INFORMATION
//////var EHRCopyDataForEasyFormsCroppedImages;

////////ADDED BY : MAHESH P
////////DATE	   : 05/01/2018	
////////THIS METHOD IS USEFUL IN COPYING THE IMAGE ELEMEMNT WITH GIVEN INPUT HTML IMAE DATA 
//////function makeTheCurrentElementCopy(elementInpt) {

//////    EHRCopyDataForEasyFormsCroppedImages = elementInpt;

//////    try {

//////        var existsTextarea = document.getElementById("taExecuteCommandCopyTextArea_" + EMRPracticeModel.EHRSessionID);

//////        if (existsTextarea == null || existsTextarea == undefined) {
//////            existsTextarea = document.createElement("textarea");
//////            existsTextarea.id = "taExecuteCommandCopyTextArea_" + EMRPracticeModel.EHRSessionID;
//////            existsTextarea.setAttribute("readonly", true);
//////            //existsTextarea.setAttribute("contentEditable", true);
//////            ////existsTextarea.style.display = "none";
//////            existsTextarea.style = "resize: none;background-color: #0072C5;height: 1px;width: 1px;overflow: hidden;border: none;"
//////            document.body.appendChild(existsTextarea);
//////        }

//////        if (hasValue(existsTextarea)) {
//////            if (hasValue(elementInpt)) {
//////                existsTextarea.value = elementInpt;////assigning the text area
//////                existsTextarea.select();////this command selects the data in text area
//////                var result = document.execCommand('copy');////this command copies selected data to clip board


//////                if (result)
//////                    console.log("ta : copied to clip board succesfully");
//////                else
//////                    console.log("ta : not copied to clip board");

//////                existsTextarea.value = "";////empting the text area
//////            }
//////        }

//////        var existsTextarea = document.getElementById("executeCopyCommand");

//////        if (existsTextarea == null || existsTextarea == undefined) {
//////            existsTextarea = document.createElement("div");
//////            existsTextarea.id = "executeCopyCommand";
//////            //existsTextarea.setAttribute("readonly", true);
//////            existsTextarea.setAttribute("contentEditable", true);
//////            ////existsTextarea.style.display = "none";
//////            existsTextarea.style = "resize: none;background-color: #0072C5;height: 1px;width: 1px;overflow: hidden;border: none;"
//////            document.body.appendChild(existsTextarea);
//////        }

//////        existsTextarea.innerHTML = elementInpt;

//////        var element = document.getElementById(existsTextarea.getAttribute("id"));

//////        element.focus();

//////        selectRangeForElement_CopyToClipBoard(element);

//////        setTimeout(function () {
//////            var result = document.execCommand('copy');
//////            if (result)
//////                console.log("div : copied to clip board succesfully");
//////            else
//////                console.log("div : not copied to clip board");
//////        });

//////    } catch (e) {

//////    }

//////}
////////#############				COPY TO CLIPBOARD FOR IMAGES BLOCK END			###############



///////////////////////  ## EHR CONTEXT MENU BLOCKING ON DOCUMENT EXCEPT THE INPUT ENTRY ELEMENTS BLOCK START  #######################////////////////
//////// WRITTEN BY : MAHESH P
//////// DATE CREATED : 09/02/2016
//////$(document).on("contextmenu", function (event) {

//////    var returnType = true;

//////    var currentTargetElementOfRightClick = $(event.target);


//////    // USE   " class = requireSpellCheck " TO GET CONTEXT MENUS ON DOCUMENT  INPUT ENTRY ELEMENTS

//////    // CHECKING FOR THE IS SPELL CHECK REQUIRED CLASS AVAILABLE OR NOT    
//////    if (hasValue(currentTargetElementOfRightClick) && hasValue(currentTargetElementOfRightClick.attr('class')) && currentTargetElementOfRightClick.attr('class').toString().toLowerCase().contains("requirespellcheck")) {

//////        try {

//////            switch (currentTargetElementOfRightClick.prop('tagName').toString().toLowerCase()) {

//////                case 'input':
//////                    if (currentTargetElementOfRightClick.prop('type').toString().toLowerCase() == "checkbox" || currentTargetElementOfRightClick.prop('type').toString().toLowerCase() == "radio")
//////                        returnType = false;
//////                    break
//////                case 'textarea':
//////                    returnType = true;
//////                    break

//////                case 'div':
//////                case 'span':
//////                case 'p':
//////                case 'label':
//////                    if (currentTargetElementOfRightClick.attr('contentEditable').toString().toLowerCase() == "true")
//////                        returnType = true;
//////                    break
//////                default:
//////                    returnType = false;
//////                    break;

//////            }
//////        }
//////        catch (e) {

//////        }
//////    } else {     // if " class = requireSpellCheck " not found then blocking the context menus
//////        returnType = false;
//////    }



//////    if (!returnType) {
//////        event.stopImmediatePropagation();
//////        event.stopPropagation();
//////    }

//////    return returnType;
//////});
///////////////////////  ## EHR CONTEXT MENU BLOCKING ON DOCUMENT EXCEPT THE INPUT ENTRY ELEMENTS BLOCK END  #######################////////////////


function getNumberOfDaysInAMonth(month, year) {

    var getDaysInAMonth = new Date(year, month, 0).getDate();

    return getDaysInAMonth
}


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// C# SUPPORTABILITY IN JAVASCRIPT
///////////////////////// AUTHOR: MAHESH P
///////////////////////// DATE : 02/16/2018
///////////////////////////////////////////////////////////////////////////////////////////

if (!String.prototype.Append) {
    String.prototype.Append = function (strin) {
        return this + strin;
    };
}

if (!String.prototype.AppendLine) {
    String.prototype.AppendLine = function (strin) {
        return this + "\n" + strin;
    };
}
if (!String.prototype.Length) {
    String.prototype.Length = function () {
        return this.length;
    };
}

if (!String.prototype.ToString) {
    String.prototype.ToString = function (formatStr) {
        if (formatStr) {
            if (formatStr === "C")
                return "$" + this;
            else
                return formatStr;
        }
        else
            return this;
    };
}


var Convert = {
    ToDateTime: function (stringInpt) {

        var dateTime = new Date(stringInpt);

        if (dateTime.toString().toLowerCase() != "invalid date") {
            return dateTime;
        }
    },
    ToDecimal: function (stringInpt) {
        return parseFloat(stringInpt).toFixed("2");
    }
}
var string = {
    Empty: "",
    IsNullOrEmpty: function (strIn) {
        return strIn == null || strIn.length == 0;
    }
};

if (!Date.prototype.ToString) {
    Date.prototype.ToString = function (format) {
        return $.format.date(this, format);
    };
}
if (!Array.prototype.Count) {
    Array.prototype.Count = function () {
        return this.length;
    };
}
///////////////////////////////////////////////////////////////////////////////////////////