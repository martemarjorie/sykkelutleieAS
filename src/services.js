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

  deleteSykkel(
    sykkel_id,
    type_sykkel,
    ramme,
    hjul_storrelse,
    girsystem,
    timepris,
    dagspris,
    tilhorer_sted,
    modell,
    success
  ) {
    connection.query('delete from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  updateSykkel(
    sykkel_id,
    type_sykkel,
    ramme,
    hjul_storrelse,
    girsystem,
    timepris,
    dagspris,
    tilhorer_sted,
    modell,
    success
  ) {
    connection.query(
      'update sykkel set type_sykkel=?, ramme=?, hjul_storrelse=?, girsystem=?, timepris=?, dagspris=?, tilhorer_sted=?, modell=? where sykkel_id=?',
      [type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, tilhorer_sted, modell, sykkel_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addSykkel(
    sykkel_id,
    type_sykkel,
    ramme,
    hjul_storrelse,
    girsystem,
    timepris,
    dagspris,
    tilhorer_sted,
    modell,
    success
  ) {
    connection.query(
      'insert into sykkel (sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, tilhorer_sted, modell) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [sykkel_id, type_sykkel, ramme, hjul_storrelse, girsystem, timepris, dagspris, tilhorer_sted, modell],
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
      'select bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, innlev_tidspunkt, utlev_tidspunkt, fornavn, tlf from bestillingsinfo',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getBestillingsinfo(bestilling_id, success) {
    connection.query(
      'select bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, fornavn, tlf from bestillingsinfo where bestilling_id=?',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  updateBestillingsinfoer(bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, fornavn, tlf, success) {
    connection.query(
      'update bestillingsinfo set bestilling_id=?, type_sykkel=?, modell=?, utlev_sted=?, innlev_sted=?, fornavn=?, tlf=? where bestilling_id=?',
      [bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, fornavn, tlf],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  deleteBestillingsinfoer(bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, fornavn, tlf, success) {
    connection.query('delete * from bestillingsinfo where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let bestillingService = new BestillingService();

/********** UTSTYR ************/

class UtstyrService {
  getUtstyrer(success) {
    connection.query('select type_utstyr, beskrivelse, pris from utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getUtstyr(utstyr_id, success) {
    connection.query('select * from bestillingsinfo where utstyr_id=?', [utstyr_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  deleteUtstyr(utstyr_id, type_utstyr, beskrivelse, pris, success) {
    connection.query('delete from utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  updateUtstyr(utstyr_id, type_utstyr, beskrivelse, pris, success) {
    connection.query(
      'update utstyr set type_utstyr=?, beskrivelse=?, pris=? where utstyr_id=?',
      [type_utstyr, beskrivelse, pris, utstyr_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addUtstyr(utstyr_id, type_utstyr, beskrivelse, pris, success) {
    connection.query(
      'insert into utstyr (utstyr_id, type_utstyr, beskrivelse, pris) values (?, ?, ?, ?)',
      [utstyr_id, type_utstyr, beskrivelse, pris],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let utstyrService = new UtstyrService();
