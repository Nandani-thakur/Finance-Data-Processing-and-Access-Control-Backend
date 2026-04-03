
// dashboardController.js
const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    
    const records = await Record.find({
      isDeleted: false,
      createdBy: req.user.id
    });

    let income = 0, expense = 0;
    const categoryMap = {};

    records.forEach(r => {
      if (r.type === "income") income += r.amount;
      else expense += r.amount;

      categoryMap[r.category] =
        (categoryMap[r.category] || 0) + r.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
      categoryBreakdown: categoryMap,
      recentTransactions: records.slice(-5)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};



exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $match: {
          createdBy: req.user.id,
          isDeleted: false
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};