import { connection } from './mysql_connection';

/****** PERSON *******/

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

  addPerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query(
      'insert into person (person_id, fornavn, etternavn, tlf, epost) values (?, ?, ?, ?, ?)',
      [person_id, fornavn, etternavn, tlf, epost],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let personService = new PersonService();

/****** SYKKEL *******/

class SykkelService {
  getSykler(success) {
    connection.query('select * from sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSykkel(sykkel_id, success) {
    connection.query('select * from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateSykkel(sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell, success) {
    connection.query(
      'update sykkel set type_sykkel=?, ramme=?, hjul_storrelse=?, girsystem=?, timepris=?, dagspris=?, tilhører_sted=?, modell=? where sykkel_id=?',
      [type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell, sykkel_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteSykkel(sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell, success) {
    connection.query('delete from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  addSykkel(sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell, success) {
    connection.query(
      'insert into sykkel (sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, modell],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let sykkelService = new SykkelService();

/***** BESTILLING *****/

class BestillingService {
  getBestillingsinfoer(success) {
    connection.query(
      'select SELECT type_sykkel, modell, utlev_sted, innlev_sted, utlev_tidspunkt, innlev_tidspunkt FROM bestillingsinfo RIGHT JOIN person ON (bestillingsinfo.tlf = person.tlf) RIGHT JOIN person_bestilling ON (person.person_id = person_bestilling.person_id)',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getBestillingsinfoer(person_id, success) {
    connection.query(
      'select SELECT type_sykkel, modell, utlev_sted, innlev_sted, utlev_tidspunkt, innlev_tidspunkt FROM bestillingsinfo RIGHT JOIN person ON (bestillingsinfo.tlf = person.tlf) RIGHT JOIN person_bestilling ON (person.person_id = person_bestilling.person_id)',
      [person_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  updateBestillingsinfoer(
    type_sykkel,
    modell,
    utlev_sted,
    innlev_sted,
    utlev_tidspunkt,
    innlev_tidspunkt,
    fornavn,
    tlf,
    success
  ) {
    connection.query(
      'update bestillingsinfo set type_sykkel=?, modell=?, utlev_sted=?, innlev_sted=?, utlev_tidspunkt=?, innlev_tidspunkt=?, fornavn=?, tlf=? where person_bestilling.perosn_id=?',
      [type_sykkel, modell, utlev_sted, innlev_sted, utlev_tidspunkt, innlev_tidspunkt, fornavn, tlf],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteBestillingsinfoer(
    type_sykkel,
    modell,
    utlev_sted,
    innlev_sted,
    utlev_tidspunkt,
    innlev_tidspunkt,
    fornavn,
    tlf,
    success
  ) {
    connection.query(
      'delete type_sykkel, modell, utlev_sted, innlev_sted, utlev_tidspunkt, innlev_tidspunkt FROM bestillingsinfo RIGHT JOIN person ON (bestillingsinfo.tlf = person.tlf) RIGHT JOIN person_bestilling ON (person.person_id = person_bestilling.person_id)',
      [person_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let bestillingService = new BestillingService();
