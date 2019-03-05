import { Primitive } from 'microstates/dist/microstates.cjs';
import { validate } from 'ember-validators';

export default class User {
  name = Field([
    ['presence', { presence: true }]
  ]);
  isAdmin = Boolean;
}

export function Field(validationArr) {
  return class Field extends Primitive {

    get validation() {
      let value = this.state;
      let results = validationArr.map((check) => {
        let [type, options] = check;

        return validate(type, value, options);
      });

      return results;
    }
    get hasErrors() {
      return !!this.validation.some(result => result !== true);
    }
  }
}
