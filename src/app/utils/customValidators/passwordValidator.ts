import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

    const hasUpperCase = upperCaseRegex.test(control.value);
    const hasLowerCase = lowerCaseRegex.test(control.value);
    const hasNumber = numberRegex.test(control.value);
    const hasSpecialChar = specialCharRegex.test(control.value);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return null;
    }

    return {
      missingUpperCase: !hasUpperCase,
      missingLowerCase: !hasLowerCase,
      missingNumber: !hasNumber,
      missingSpecialChar: !hasSpecialChar
    };
  }