import { connection } from './mysql_connection';

/******* NY BESTILLING *******/

class BestillingService {
  addBestilling(
    person_id,
    utlev_tidspunkt,
    innlev_tidspunkt,
    utlev_sted,
    innlev_sted,
    sykkel_ids,
    utstyr_ids,
    success
  ) {
    console.log(
      'Argumenter til addBestilling: ',
      person_id,
      utlev_tidspunkt,
      innlev_tidspunkt,
      utlev_sted,
      innlev_sted,
      sykkel_ids,
      utstyr_ids
    );

    connection.query(
      'insert into bestilling (person_id,  utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted) values (?, ?, ?, ?, ?)',
      [person_id, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results);

        for (let utstyr_id of utstyr_ids) {
          connection.query(
            'insert into leid_utstyr (bestilling_id, utstyr_id) values (?, ?)',
            [results.insertId, utstyr_id],
            (error, result) => {
              if (error) return console.error('Error in the third query, error was: ' + error.message);
            }
          );
        }

        for (let sykkel_id of sykkel_ids) {
          connection.query(
            'insert into leid_sykkel (bestilling_id, sykkel_id) values (?, ?)',
            [results.insertId, sykkel_id],
            (error, result) => {
              if (error) return console.error('Error in the second query, error was: ' + error.message);
            }
          );
        }
        success();
      }
    );
  }

  deleteBestilling(bestilling_id, person_id, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted, success) {
    connection.query('delete from leid_sykkel where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error);

      connection.query('delete from leid_utstyr where bestilling_id=?', [bestilling_id], (error, results) => {
        if (error) return console.error(error);

        connection.query('delete from bestilling where bestilling_id=?', [bestilling_id], (error, results) => {
          if (error) return console.error(error);
        });
      });
    });
  }
}

export let bestillingService = new BestillingService();

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
      'select person_id, fornavn, etternavn, tlf, epost from person where person_id like ? or fornavn like ? or etternavn like ? or tlf like ? or epost like ?',
      [input + '%', input + '%', input + '%', input + '%', input + '%'],
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

  getBikes(success) {
    connection.query(
      'select sykkel_id, type_sykkel, modell, ramme, hjul_storrelse, girsystem, timepris, dagspris, tilhorer_sted, sted_navn from sykkel, sted where sykkel.tilhorer_sted = sted.sted_id',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
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
    connection.query('delete from leid_sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
      if (error) return console.error(error);

      connection.query('delete from frakt_sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
        if (error) return console.error(error);

        connection.query('delete from reparasjon where sykkel_id=?', [sykkel_id], (error, results) => {
          if (error) return console.error(error);

          connection.query('delete from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
            if (error) return console.error(error);
            success();
          });
        });
      });
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
      'select sykkel_id, type_sykkel, timepris, dagspris, modell from sykkel where sykkel_id like ? or type_sykkel like ? or timepris like ? or dagspris like ? or modell like ?',
      [input + '%', input + '%', input + '%', input + '%', input + '%'],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}
export let sykkelService = new SykkelService();

/***** BESTILLINGER ****/

class BestillingerService {
  getBestillinger(success) {
    connection.query(
      'select b.bestilling_id, b.person_id, fornavn, tlf, type_sykkel, modell, type_utstyr, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted from bestilling b left join person p on p.person_id = b.person_id left join leid_sykkel ls on ls.bestilling_id = b.bestilling_id left join leid_utstyr lu on lu.bestilling_id = b.bestilling_id left join sykkel s on ls.sykkel_id = s.sykkel_id left join utstyr u on lu.utstyr_id = u.utstyr_id order by utlev_tidspunkt',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  searchBestilling(input, success) {
    connection.query(
      'select b.bestilling_id, fornavn, tlf, type_sykkel, modell, type_utstyr, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted from bestilling b left join person p on p.person_id = b.person_id left join leid_sykkel ls on ls.bestilling_id = b.bestilling_id left join leid_utstyr lu on lu.bestilling_id = b.bestilling_id left join sykkel s on ls.sykkel_id = s.sykkel_id left join utstyr u on lu.utstyr_id = u.utstyr_id where b.bestilling_id like ? or fornavn like ? or tlf like ? or type_sykkel like ? or modell like ? or type_utstyr like ? or utlev_tidspunkt like ? or innlev_tidspunkt like ? or utlev_sted like ? or innlev_sted like ?',
      [
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%',
        input + '%'
      ],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  updateBestillinger(bestilling_id, utlev_tidspunkt, innlev_tidspunkt, success) {
    connection.query(
      'update bestilling set utlev_tidspunkt=?, innlev_tidspunkt=? where bestilling_id=?',
      [utlev_tidspunkt, innlev_tidspunkt, bestilling_id],
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
    connection.query('update person set fornavn=?, tlf=? where person_id=?', [fornavn, tlf], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let bestillingerService = new BestillingerService();

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
    connection.query('delete from leid_utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
      if (error) return console.error(error);

      connection.query('delete from utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
        if (error) return console.error(error);
      });
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
      'select utstyr_id, type_utstyr, beskrivelse, pris from utstyr where utstyr_id like ? or type_utstyr like ? or beskrivelse like ? or pris like ?',
      [input + '%', input + '%', input + '%', input + '%'],
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

/********** REPARASJON ************/
class RepService {
  getReps(success) {
    connection.query('select * from reparasjon', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getRep(reparasjons_id, success) {
    connection.query('select * from reparasjon where reparasjons_id=?', [reparasjons_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}

export let repService = new RepService();

/********** FRAKT ************/

class FraktService {
  getFrakter(success) {
    connection.query(
      'select * from frakt f, frakt_sykkel fs, sykkel s, sted where f.frakt_id = fs.frakt_id and fs.sykkel_id = s.sykkel_id and f.fra_sted = sted.sted_id',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getFrakt(frakt_id, success) {
    connection.query('select * from frakt where frakt_id=?', [frakt_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateFrakt(frakt_id, frakt_dato, status, success) {
    connection.query(
      'update frakt set frakt_dato=?, status=? where frakt_id=?',
      [frakt_dato, status, frakt_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let fraktService = new FraktService();
