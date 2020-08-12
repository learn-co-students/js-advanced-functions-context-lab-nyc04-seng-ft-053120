/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employeesArray) => {
  return employeesArray.map((employeeArr) => createEmployeeRecord(employeeArr));
};

const createTimeInEvent = function (date) {
  const timeObj = {
    type: "TimeIn",
    hour: parseInt(date.split(" ")[1]),
    date: date.split(" ")[0],
  };
  this.timeInEvents.push(timeObj);
  return this;
};

const createTimeOutEvent = function (date) {
  const timeObj = {
    type: "TimeOut",
    hour: parseInt(date.split(" ")[1]),
    date: date.split(" ")[0],
  };
  this.timeOutEvents.push(timeObj);
  return this;
};

const hoursWorkedOnDate = function (date) {
  const timeInEvent = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  );
  const timeOutEvent = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  );

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const payrollExpense = function (employeesArr) {
  return employeesArr.reduce((total, employee) => {
    total += allWagesFor(employee);
  }, 0);
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
};

const calculatePayroll = function (arrEmployees) {
  return arrEmployees.reduce((total, employee) => {
    return (total += allWagesFor.call(employee));
  }, 0);
};
