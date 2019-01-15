import Controller from '@ember/controller';
import { valueOf } from '@microstates/ember';

export default Controller.extend({
  actions: {
    onsubmit(user) {
      this.set('model', valueOf(user));
    }
  }
});
