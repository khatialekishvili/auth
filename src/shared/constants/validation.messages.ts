export const registerValidationMessages = {
  username: {
    required: 'Username is required',
    minlength: 'Minimum 3 characters are required'
  },

  email: {
    required: 'Email is required',
    email: 'Invalid email format'
  },

  birth_date: {
    required: 'Birth date is required',
    min: 'Must be at least 18 years old'
  },

  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters'
  },

  confirm_password: {
    required: 'Confirm password is required',
    mismatch: 'Passwords do not match'
  }
};

export const loginValidationMessages = {
  email: {
    required: 'Email is required',
    email: 'Invalid email format'
  },

  password: {
    required: 'Password is required'
  }
};