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

  searchPerson(input, success) {
    connection.query(
      'select fornavn, etternavn, tlf, epost from person where fornavn like ? or etternavn like ? or tlf like ? or epost like ?',
       [input + '%', input + '%', input + '%', input + '%'],
       (error, results) => {
        if (error) return console.error(error);

        success(results);
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
  searchSykkel(input, success) {
    connection.query(
      'select type_sykkel, timepris, dagspris, modell from sykkel where type_sykkel like ? or timepris like ? or dagspris like ? or modell like ?',
       [input + '%', input + '%', input + '%', input + '%'],
       (error, results) => {
        if (error) return console.error(error);

        success(results);
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

  updateBestillingsinfo(
    bestilling_id,
    type_sykkel,
    modell,
    utlev_tidspunkt,
    innlev_tidspunkt,
    utlev_sted,
    innlev_sted,
    fornavn,
    tlf,
    success
  ) {
    connection.query(
      'update bestilling set bestilling_id=?, utlev_tidspunkt=?, innlev_tidspunkt=?, utlev_sted=?, innlev_sted=? where bestilling_id=?',
      [bestilling_id, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
    connection.query(
      'update sykkel set type_sykkel=?, modell=? where sykkel_id=?',
      [type_sykkel, modell],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
    connection.query('update person set fornavn=?, tlf=?', [fornavn, tlf], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  /*  deleteBestillingsinfo(bestilling_id, type_sykkel, modell, utlev_sted, innlev_sted, fornavn, tlf, success) {
    connection.query('delete * from bestillingsinfo where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  } */
}
export let bestillingService = new BestillingService();

/********** UTSTYR ************/

class UtstyrService {
  getUtstyrer(success) {
    connection.query('select * from utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getUtstyr(utstyr_id, success) {
    connection.query('select * from utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
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
  searchUtstyr(input, success) {
    connection.query(
      'select type_utstyr, beskrivelse, pris from utstyr where type_utstyr like ? or beskrivelse like ? or pris like ?',
       [input + '%', input + '%', input + '%'],
       (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let utstyrService = new UtstyrService();

/********** STEDER ************/

class StedService {
  getSteder(success) {
    connection.query('select * from sted', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSted(sted_navn, success) {
    connection.query('select * from sted where sted_navn=?', [sted_navn], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}

export let stedService = new StedService();

/********** FRAKT ************/

class FraktService {
  getFrakter(success) {
    connection.query(
      'SELECT type_sykkel, modell, fra_sted, til_sted, frakt_dato, status FROM frakt INNER JOIN frakt_sykkel ON (frakt.frakt_id = frakt_sykkel.frakt_id) INNER JOIN sykkel ON (frakt_sykkel.sykkel_id = sykkel.sykkel_id)',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getFrakt(frakt_id, success) {
    connection.query(
      'SELECT type_sykkel, modell, fra_sted, til_sted, frakt_dato, status FROM frakt INNER JOIN frakt_sykkel ON (frakt.frakt_id = frakt_sykkel.frakt_id) INNER JOIN sykkel ON (frakt_sykkel.sykkel_id = sykkel.sykkel_id WHERE frakt_id=?',
      [frakt_id],
      (error,
      results => {
        if (error) return console.log(error);

        success(results[0]);
      })
    );
  }

  updateFrakt(frakt_id, type_sykkel, modell, fra_sted, til_sted, frakt_dato, status, success) {
    connection.query(
      'update frakt set frakt_id=?, type_sykkel=?, modell=?, fra_sted=?, til_sted=?, frakt_dato=?, status=? where frakt_id=?',
      [frakt_id, type_sykkel, modell, fra_sted, til_sted, frakt_dato, status],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteFrakt(frakt_id, type_sykkel, modell, fra_sted, til_sted, frakt_dato, status, success) {
    connection.query('delete * from frakt where frakt_id=?', [frakt_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let fraktService = new FraktService();
