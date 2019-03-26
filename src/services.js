import { connection } from './mysql_connection';

class PersonService {
  getPersons(success) {
    connection.query('select * from person', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getPerson(person_id, success) {
    connection.query('select * from person where person_id=?', [person_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updatePerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query(
      'update person set fornavn=?, etternavn=?, tlf=?, epost=? where person_id=?',
      [fornavn, etternavn, tlf, epost, person_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deletePerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query('delete from person where person_id=?', [person_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  addPerson(fornavn, etternavn, tlf, epost, success) {
    connection.query(
      'insert into Person (fornavn, etternavn, tlf, epost) values (?, ?, ?, ?)',
      [fornavn, etternavn, tlf, epost],
      (error, results) => {
        if (error) return console.log(error);

        success(results.insertId);
      }
    );
  }
}
export let personService = new PersonService();
