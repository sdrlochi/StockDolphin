const Activity = require("../models/Activity");

exports.getActivityHistory = async (req, res) => {
  const { action } = req.query; // Optional filter by action

  try {
    const filter = { user: req.user._id };
    if (action) {
      filter.action = action;
    }

    const activities = await Activity.find(filter).sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInventorySummary = async (req, res) => {
  const { startDate, endDate } = req.query; // Date range filter

  try {
    const filter = {
      user: req.user._id,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    const activities = await Activity.find(filter).sort({ createdAt: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
