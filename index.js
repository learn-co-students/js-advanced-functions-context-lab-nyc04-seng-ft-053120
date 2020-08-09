let createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

let createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map((array) => createEmployeeRecord(array))
};

function createTimeInEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour)
    })
    return this
};

function createTimeOutEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour)
    })
    return this
};

function hoursWorkedOnDate(dateString) {
    let timeInEvent = this.timeInEvents.find((timeInEvent) => timeInEvent.date === dateString);
    let timeOutEvent = this.timeOutEvents.find((timeOutEvent) => timeOutEvent.date === dateString);
    return (timeOutEvent.hour - timeInEvent.hour)/100
};

function wagesEarnedOnDate(dateString) {
    return hoursWorkedOnDate.call(this, dateString) * this.payPerHour
};

function calculatePayroll(employees) {
    let wagesArray = employees.map((employee) => allWagesFor.call(employee));
    return wagesArray.reduce((totalPayroll, payroll) => totalPayroll + payroll)
};

function findEmployeeByFirstName(employees, employeeFirstName) {
    return employees.find((employee) => employee.firstName === employeeFirstName)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}