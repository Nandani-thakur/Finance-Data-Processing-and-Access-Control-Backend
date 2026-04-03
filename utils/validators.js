
// utils/validators.js


exports.validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


exports.validatePassword = (password) => {
  return password && password.length >= 6;
};

// Record validation
exports.validateRecord = (data) => {
  const { amount, type, category } = data;

  
  if (amount === undefined || typeof amount !== "number")
     {
    return "Amount must be a number";
  }

  if (!["income", "expense"].includes(type)) {
    return "Type must be income or expense";
  }

  if (!category) {
    return "Category is required";
  }

  return null; 
};