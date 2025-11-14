export const registerValidationMessages = {
  username: {
    required: 'მომხმარებლის სახელი სავალდებულოა',
    minlength: 'მინიმუმ 3 სიმბოლოა საჭირო'
  },

  email: {
    required: 'იმეილი სავალდებულოა',
    email: 'არასწორი ელფოსტის ფორმატი'
  },

  birth_date: {
    required: 'დაბადების თარიღი სავალდებულოა',
    min: 'უნდა იყოთ 18 წლის ან მეტის'
  },

  password: {
    required: 'პაროლი სავალდებულოა',
    minlength: 'პაროლი უნდა შეიცავდეს მინ. 6 სიმბოლოს'
  },

  confirm_password: {
    required: 'გაიმეორე პაროლი',
    mismatch: 'პაროლები არ ემთხვევა'
  }
};

export const loginValidationMessages = {
  email: {
    required: 'იმეილი სავალდებულოა',
    email: 'არასწორი ელფოსტის ფორმატი'
  },

  password: {
    required: 'პაროლი სავალდებულოა'
  }
};