import { REALM_APP_ID } from '../config';
import Realm from 'realm';
import { Sensors } from 'schemas/SensorData';

const app = new Realm.App({ id: REALM_APP_ID });

export const login = async (email, password) => {
  const credentials = Realm.Credentials.emailPassword(email, password);
  let user = await app.logIn(credentials);
  return user;
};

export const getRealm = async user => {
  try {
    const realm = await Realm.open({
      schema: [Sensors],
      sync: { user, flexible: true },
    });
    await realm.subscriptions.update(mutableSubscriptions => {
      mutableSubscriptions.add(
        realm.objects('sensors')
      );
    });
    return realm;
  } catch (error) {
    return error;
  }
};

export const find = async (schema, realm) => {
  try {
    return realm.objects(schema);
  } catch (error) {
    return error;
  }
};
