import { Primitive } from 'microstates/dist/microstates.cjs';
import { validate } from 'ember-validators';
import messages from 'ember-validators/messages';

export default class User {
  name = Field([
    ['presence', { presence: true }],
    ['length', { allowNone: false, min: 3 }]
  ]);
  isAdmin = Boolean;
}

export function Field(validationArr) {
  return class Field extends Primitive {
    get validation() {
      let value = this.state;
      let results = validationArr.map((check) => {
        let [type, options] = check;
	let opts = { ...options };
	
	if (!opts.description) {
	  opts.description = this.constructor.path[0]
	}
        let result = validate(type, value, options, {}, this.constructor.path[0]);
	if (result && result.type) {
	  result.message = messages.getMessageFor(result.type, opts);
	}
        return result;
      });

      return results;
    }
    get hasErrors() {
      return !!this.validation.some(result => result !== true);
    }
  }
}
