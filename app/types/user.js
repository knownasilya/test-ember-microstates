import { validate } from 'ember-validators';

export default class User {
  name = Field(String, [
    ['presence', { presence: true }]
  ]);
  isAdmin = Boolean;
}

export function Field(Type, validationArr) {
  return class Field extends Type {
    get validation() {
      let value = valueOf(this);
      let results = validationArr.map((check) => {
        let [type, options] = check;

        return validate(type, value, options);
      });

      debugger;
      return results;
    }   
    get hasErrors() {
      debugger;
      return this.validation.length > 0;
    }
  }
}