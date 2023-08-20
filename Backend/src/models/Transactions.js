const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
    owner_id: { type: String, required: true }, //user's _id
    requester_id: { type: String, required: true }, //user's _id
    listing_id: { type: String, required: true }, //listing's _id
    status: {
      type: String,
      enums: [
        "pending_response",
        "accepted",
        "declined",
        "completed",
        "expired",
      ],
    },
  },
  { collection: "transactions" }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;