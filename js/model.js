var modelController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  function addItem(type, desc, val) {
    var newItem, ID;

    if (data.allItems[type].length > 0) {
      var lastIndex = data.allItems[type].length - 1;
      ID = data.allItems[type][lastIndex].id + 1;
    } else {
      ID = 0;
    }

    if (type === "inc") {
      newItem = new Income(ID, desc, parseFloat(val));
    } else if (type === "exp") {
      newItem = new Expense(ID, desc, parseFloat(val));
    }

    data.allItems[type].push(newItem);
    return newItem;
  }

  function deleteItem(type, id) {
    var ids = data.allItems[type].map(function (item) {
      return item.id;
    });

    index = ids.indexOf(id);

    if (index !== -1) {
      data.allItems[type].splice(index, 1);
    }
  }

  function calculateTotalSum(type) {
    var sum = 0;
    data.allItems[type].forEach(function (item) {
      sum = sum + item.value;
    });

    return sum;
  }
  function calculateBudget() {
    data.totals.inc = calculateTotalSum("inc");

    data.totals.exp = calculateTotalSum("exp");

    // расчет общего бюджета
    data.budget = data.totals.inc - data.totals.exp;

    //  расчет процента
    if (data.totals.inc > 0) {
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
      data.percentage = -1;
    }
  }

  function getBudget() {
    return {
      budget: data.budget,
      totalIncome: data.totals.inc,
      totalExp: data.totals.exp,
      percentage: data.percentage,
    };
  }

  function calculatePercentages() {
    data.allItems.exp.forEach(function (item) {
      item.calcPercentage(data.totals.inc);
    });
  }

  function getAllIdsAndPercentages() {
    var allPerc = data.allItems.exp.map(function (item) {
      return [item.id, item.getPercentage()];
    });

    return allPerc;
  }

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: addItem,
    calculateBudget: calculateBudget,
    getBudget: getBudget,
    deleteItem: deleteItem,
    calculatePercentages: calculatePercentages,
    getAllIdsAndPercentages: getAllIdsAndPercentages,

    test: function () {
      console.log(data);
    },
  };
})();
