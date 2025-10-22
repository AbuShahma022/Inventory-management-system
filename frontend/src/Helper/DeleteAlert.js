import Swal from "sweetalert2";

/**
 * Show a confirmation popup before deleting
 * @param {Function} onConfirm - callback to run if user confirms
 */
export const confirmDelete = (onConfirm) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm(); // run your delete function
      Swal.fire("Deleted!", "The item has been deleted.", "success");
    }
  });
};
