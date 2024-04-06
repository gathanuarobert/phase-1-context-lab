/* Your Code Here */
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return createEmployeeRecords;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });

    return createEmployeeRecordsmployeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (!timeInEvent || !timeOutEvent) {
        return 0; // Return 0 if either timeInEvent or timeOutEvent is not found for the given date
    }

    const timeInHour = timeInEvent.hour / 100;
    const timeOutHour = timeOutEvent.hour / 100;

    return timeOutHour - timeInHour;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    
    return hoursWorked * payRate;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employeeRecord => employeeRecord.firstName === firstName);
}

function calculatePayroll(employeeRecordsArray) {
    let totalPayroll = 0;

    // Iterate over each employee record and accumulate their total wages
    employeeRecordsArray.forEach(employeeRecord => {
        const wagesForEmployee = allWagesFor(employeeRecord);
        totalPayroll += wagesForEmployee;
    });

    return totalPayroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

