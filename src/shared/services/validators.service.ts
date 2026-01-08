import { AbstractControl, ValidationErrors } from '@angular/forms';


export function adultValidator(control: AbstractControl): ValidationErrors | null {
  const birthDate = new Date(control.value);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  const age =
    today.getFullYear() - birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ?  1 : 0);

  return age >= 18 ? null : { min: true };
}

export function matchPasswords(passwordKey: string, confirmKey: string) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const group = formGroup as any;
    const pass = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (pass && confirm && pass.value !== confirm.value) {
      confirm.setErrors({ mismatch: true });
    } else {
      confirm.setErrors(null);
    }
    return null;
  };
}