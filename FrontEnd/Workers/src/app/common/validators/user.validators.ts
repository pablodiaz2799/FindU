import { AbstractControl, ValidationErrors } from '@angular/forms';


export class UserValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0 ) {
            return {cannotContainSpace: true};
        }

        return null;
    }

    static dotCom(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf('.com') < 0) {
            return {dotCom: true};
        }

        return null;
    }
}
