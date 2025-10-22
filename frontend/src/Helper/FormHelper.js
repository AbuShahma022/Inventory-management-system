import { toast } from "react-hot-toast";

// Regular Expressions
const EmailRegx = /\S+@\S+\.\S+/;
// Accepts any country code, digits, spaces, dashes, or parentheses
const MobileRegx = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

class FormHelper {
  // 🔹 Check if a field is empty
  IsEmpty(value) {
    return value.trim().length === 0;
  }

  // 🔹 Validate mobile (any country)
  IsMobile(value) {
    return MobileRegx.test(value);
  }

  // 🔹 Validate email
  IsEmail(value) {
    return EmailRegx.test(value);
  }

  // 🔹 Show error toast
  ErrorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }

  // 🔹 Show success toast
  SuccessToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }

  // 🔹 Convert file to pure Base64 string (no metadata)
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // remove "data:image/...;base64,"
        resolve(base64String);
      };

      reader.onerror = (error) => reject(error);
    });
  }
}

// Export instance methods
export const {
  IsEmpty,
  IsMobile,
  IsEmail,
  ErrorToast,
  SuccessToast,
  getBase64,
} = new FormHelper();
