import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { editTransactions, deleteTransactions } from "../../utils/ApiRequest"; // Assuming you have these API endpoints
import axios from "axios";
import { toast } from "react-toastify";

const ActionBox = ({ transactionId, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);

  // Handle the edit click event
  const handleEditClick = (e) => {
    e.preventDefault();
    // Pass the transactionId back to parent (or open modal for editing)
    onEdit(transactionId);
  };

  // Handle the delete click event
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.delete(`${deleteTransactions}/${transactionId}`);

      if (data.success) {
        toast.success("Transaction deleted successfully");
        onDelete(transactionId); // Update parent to remove the transaction from the list
      } else {
        toast.error("Failed to delete the transaction");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="icons-handle">
      <EditNoteIcon
        sx={{ cursor: "pointer" }}
        onClick={handleEditClick}
        titleAccess="Edit transaction"
      />
      <DeleteForeverIcon
        sx={{ color: "red", cursor: "pointer" }}
        onClick={!loading ? handleDeleteClick : null}
        titleAccess={loading ? "Deleting..." : "Delete transaction"}
      />
    </div>
  );
};

export default ActionBox;
