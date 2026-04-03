

// recordController.js
const { validateRecord } = require("../utils/validators");
const Record = require("../models/Record");


exports.createRecord = async (req, res) => {
  try {
    const error = validateRecord(req.body);
    if (error) return res.status(400).json({ msg: error });

    const record = await Record.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};



exports.getRecords = async (req, res) => {
  try {
    const { page = 1, limit = 5, type, category, search } = req.query;

    const query = {
      isDeleted: false,
      createdBy: req.user.id
    };

    if (type) query.type = type;
    if (category) query.category = category;
    if (search) query.note = { $regex: search, $options: "i" };

    const records = await Record.find(query)
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
// Update Record
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) return res.status(404).json({ msg: "Record not found" });
    if (record.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not allowed" });


    const error = validateRecord({ ...record.toObject(), ...req.body });
    if (error) return res.status(400).json({ msg: error });

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) return res.status(404).json({ msg: "Record not found" });
    if (record.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not allowed" });

    await Record.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.json({ msg: "Record soft deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};