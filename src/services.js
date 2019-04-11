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
      //Henter ut alle verdiene som skal bli påvirket av bestilling
    connection.query(
      'insert into bestilling (person_id,  utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted) values (?, ?, ?, ?, ?)',
      [person_id, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results);
        //Legger inn verdier inn i bestilling tabellen i databasen med verdiene lagt til fra bestillingsiden.
        for (let utstyr_id of utstyr_ids) {
          connection.query(
            'insert into leid_utstyr (bestilling_id, utstyr_id) values (?, ?)',
            [results.insertId, utstyr_id],
            (error, result) => {
              if (error) return console.error('Error in the third query, error was: ' + error.message);
          } //Legger inn verdier inn i leid utstyr tabellen i databasen med verdiene lagt til fra bestillingsiden.
          );
        }

        for (let sykkel_id of sykkel_ids) {
          connection.query(
            'insert into leid_sykkel (bestilling_id, sykkel_id) values (?, ?)',
            [results.insertId, sykkel_id],
            (error, result) => {
              if (error) return console.error('Error in the second query, error was: ' + error.message);
            } //Legger inn verdier inn i leid sykkel tabellen i databasen med verdiene lagt til fra bestillingsiden.
          );
        }
        success();
      }
    );
  }

  deleteBestilling(
    bestilling_id,
    fornavn,
    tlf,
    type_sykkel,
    modell,
    type_utstyr,
    utlev_tidspunkt,
    innlev_tidspunkt,
    utlev_sted,
    innlev_sted,
    success
  ) // Henter ut verdiene som skal bli påvirket 
  {
    connection.query('delete from leid_sykkel where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error1);
    });
    // Ved sletting av bestilling må vi først slette fra tabellen leid sykkel
    connection.query('delete from leid_utstyr where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error2);
    });
    // Deretter må vi påvirke tabellen leid utstyr
    connection.query('delete from bestilling where bestilling_id=?', [bestilling_id], (error, results) => {
      if (error) return console.error(error3);
      // Til slutt får vi slettet bestillingen fra bestillingtabellen (Det er noe feil, vi fant aldri ut av hva som var feil og hadde ikke tid til å prioritere dette)
      success();
    });
  }
}

export let bestillingService = new BestillingService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/****** PERSON *******/

class PersonService {
  getPersons(success) {
    connection.query('select * from person', (error, results) => {
      if (error) return console.error(error);
      // Her skal det hentes ut alt fra person tabellen i databasen for å kunne bruke i kodingen
      success(results);
    });
  }

  getPerson(person_id, success) {
    connection.query('select * from person where person_id=?', [person_id], (error, results) => {
      if (error) return console.error(error);
        // Ved hjelp av denne koden får vi ut den rikige personen ut ifra person_id denne har i databasen
      success(results[0]);
    });
  }

  updatePerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query(
      'update person set fornavn=?, etternavn=?, tlf=?, epost=? where person_id=?',
      [fornavn, etternavn, tlf, epost, person_id],
      (error, results) => {
        if (error) return console.error(error);
        // Ved hjelp av denne koden får vi oppdatert/endret informasjonen til den riktige personen ved hjelp av person_id fra databasen og gjort om verdiene i databasen.
        success();
      }
    );
  }
  deletePerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query('delete from person where person_id=?', [person_id], (error, results) => {
      if (error) return console.error(error);
      // Her lager vi en spørring hvor vi sletter personen med valgte person_id fra siden
      success();
    });
  }

  addPerson(person_id, fornavn, etternavn, tlf, epost, success) {
    connection.query(
      'insert into person (person_id, fornavn, etternavn, tlf, epost) values (?, ?, ?, ?, ?)',
      [person_id, fornavn, etternavn, tlf, epost],
      (error, results) => {
        if (error) return console.error(error);
        // Ved hjelp av denne koden kan vi legge til nye kunder i databasen ved å fylle ut verdier og lagre det. Person_id'en genereres automatisk ved auto_increment
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
        // Her har vi en spørring som ut ifra input i inputfeltet skal finne ting på siden som har verdiene som skrives inn ved hjelp av input + "%"
        success(results);
      }
    );
  }
}
export let personService = new PersonService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/****** SYKKEL *******/

class SykkelService {
  getSykler(success) {
    connection.query('select * from sykkel', (error, results) => {
      if (error) return console.error(error);
      // Henter ut alle verdiene fra sykkel tabellen
      success(results);
    });
  }

  getBikes(success) {
    connection.query(
      'select sykkel_id, type_sykkel, modell, ramme, hjul_storrelse, girsystem, timepris, dagspris, tilhorer_sted, sted_navn from sykkel, sted where sykkel.tilhorer_sted = sted.sted_id',
      (error, results) => {
        if (error) return console.error(error);
         // Henter ut verdiene til syklene for å bruke det
        success(results);
      }
    );
  }

  getSykkel(sykkel_id, success) {
    connection.query('select * from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
      if (error) return console.error(error);
      // Henter ut verdiene til hver enkelt sykkel utifra sykkel_id'en som er gitt
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
      // Sletting av sykkel må foregå ved å slette fra leid sykkel tabellen først
      connection.query('delete from frakt_sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
        if (error) return console.error(error);
        // Sletting av sykkel må foregå ved å slette fra frakt sykkel tabellen deretter
        connection.query('delete from reparasjon where sykkel_id=?', [sykkel_id], (error, results) => {
          if (error) return console.error(error);
         // Sletting av sykkel må foregå ved å slette fra reparasjon tabellen som siste
          connection.query('delete from sykkel where sykkel_id=?', [sykkel_id], (error, results) => {
            if (error) return console.error(error);
            // Sletting av sykkel må foregå ved å slette fra sykkel tabellen etter å ha slettet fra de andre først, så sletter man sykkelen komplett
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
        // Oppdatere/endre sykkelen utifra sykkel id'en, her skal man kunne endre en eller alle verdiene på en gang
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
        // Her legges det til en ny sykkel med oppgitte verdier i feltene.
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
        // Her har vi en spørring som ut ifra input i inputfeltet skal finne ting på siden som har verdiene som skrives inn ved hjelp av input + "%"
        success(results);
      }
    );
  }
}
export let sykkelService = new SykkelService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/***** BESTILLINGER ****/

class BestillingerService {
  getBestillinger(success) {
    connection.query(
      'select b.bestilling_id, b.person_id, fornavn, tlf, type_sykkel, modell, type_utstyr, utlev_tidspunkt, innlev_tidspunkt, utlev_sted, innlev_sted from bestilling b left join person p on p.person_id = b.person_id left join leid_sykkel ls on ls.bestilling_id = b.bestilling_id left join leid_utstyr lu on lu.bestilling_id = b.bestilling_id left join sykkel s on ls.sykkel_id = s.sykkel_id left join utstyr u on lu.utstyr_id = u.utstyr_id order by utlev_tidspunkt',
      (error, results) => {
        if (error) return console.error(error);
        // Her hentes det ut informasjon for å få ut bestillingsoversikt
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
        // Her har vi en spørring som ut ifra input i inputfeltet skal finne ting på siden som har verdiene som skrives inn ved hjelp av input + "%"
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
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/********** UTSTYR ************/

class UtstyrService {
  getUtstyrer(success) {
    connection.query('select * from utstyr', (error, results) => {
      if (error) return console.error(error);
      // Henter ut informasjon fra utstyr tabellen i databasen
      success(results);
    });
  }

  getUtstyr(utstyr_id, success) {
    connection.query('select * from utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
      if (error) return console.error(error);
      // Viser utstyret ut ifra utstyr_id
      success(results[0]);
    });
  }

  deleteUtstyr(utstyr_id, type_utstyr, beskrivelse, pris, success) {
    connection.query('delete from leid_utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
      if (error) return console.error(error);
      // Sletter leid_utstyr utifra valgt id.
      connection.query('delete from utstyr where utstyr_id=?', [utstyr_id], (error, results) => {
        if (error) return console.error(error);
        // Sletter utstyret etter at den har blitt slettet fra leid_utstyr tabellen
      });
    });
  }

  updateUtstyr(utstyr_id, type_utstyr, beskrivelse, pris, success) {
    connection.query(
      'update utstyr set type_utstyr=?, beskrivelse=?, pris=? where utstyr_id=?',
      [type_utstyr, beskrivelse, pris, utstyr_id],
      (error, results) => {
        if (error) return console.error(error);
        // endre/oppdatere utstyr med valgte id.
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
        // legg til et utstyr med auto increment så id genereres automatisk
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
        // Her har vi en spørring som ut ifra input i inputfeltet skal finne ting på siden som har verdiene som skrives inn ved hjelp av input + "%"
        success(results);
      }
    );
  }
}

export let utstyrService = new UtstyrService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/********** STEDER ************/

class StedService {
  getSteder(success) {
    connection.query('select * from sted', (error, results) => {
      if (error) return console.error(error);
      // henter ut alle verdiene fra sted
      success(results);
    });
  }

  getSted(sted_navn, success) {
    connection.query('select * from sted where sted_navn=?', [sted_navn], (error, results) => {
      if (error) return console.error(error);
      // henter ut informasjon for å kunne bruke det videre
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
      // henter ut all informasjon fra reparasjon tabellen
      success(results);
    });
  }

  getRep(reparasjons_id, success) {
    connection.query('select * from reparasjon where reparasjons_id=?', [reparasjons_id], (error, results) => {
      if (error) return console.error(error);
      // henter ut alle reparasjoner med bestemte id'er
      success(results[0]);
    });
  }

  updateRep(reparasjons_id, repinnlev_dato, reputlev_dato, rep_beskrivelse, success) {
    connection.query(
      'update reparasjon set repinnlev_dato=?, reputlev_dato=?, rep_beskrivelse=? where reparasjons_id=?',
      [repinnlev_dato, reputlev_dato, rep_beskrivelse, reparasjons_id],
      (error, results) => {
        if (error) return console.error(error);
        // mulighet til å oppdatere reparasjoner ut ifra valgte id
        success();
      }
    );
  }

  addRep(reparasjons_id, sykkel_id, repinnlev_dato, reputlev_dato, rep_beskrivelse, success) {
    connection.query(
      'insert into reparasjon (reparasjons_id, sykkel_id, repinnlev_dato, reputlev_dato, rep_beskrivelse) values (?, ?, ?, ?, ?)',
      [reparasjons_id, sykkel_id, repinnlev_dato, reputlev_dato, rep_beskrivelse],
      (error, results) => {
        if (error) return console.error(error);
        // muligheten til å legge til reparasjoner med verdier fra inputfelt
        success();
      }
    );
  }

  deleteRep(reparasjons_id, sykkel_id, repinnlev_dato, reputlev_dato, rep_beskrivelse, success) {
    connection.query('delete from reparasjon where reparasjons_id=?', [reparasjons_id], (error, results) => {
      if (error) return console.error(error);
      // Sletting av reparasjoner utifra valgte id
      success();
    });
  }
}

export let repService = new RepService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene

/********** FRAKT ************/

class FraktService {
  getFrakter(success) {
    connection.query(
      'select * from frakt f, frakt_sykkel fs, sykkel s, sted where f.frakt_id = fs.frakt_id and fs.sykkel_id = s.sykkel_id and f.fra_sted = sted.sted_id',
      (error, results) => {
        if (error) return console.error(error);
        // Henter ut frakter og viser hvilke sykler det gjelder
        success(results);
      }
    );
  }

  getFrakt(frakt_id, success) {
    connection.query('select * from frakt where frakt_id=?', [frakt_id], (error, results) => {
      if (error) return console.error(error);
      // Henter ut frakten med unike id'er
      success(results[0]);
    });
  }

  updateFrakt(frakt_id, frakt_dato, status, success) {
    connection.query(
      'update frakt set frakt_dato=?, status=? where frakt_id=?',
      [frakt_dato, status, frakt_id],
      (error, results) => {
        if (error) return console.error(error);
        // oppdatere/endre frakt utifra valgte id
        success();
      }
    );
  }

  addFrakt(frakt_id, sykkel_id, fra_sted, til_sted, frakt_dato, status, success) {
    connection.query(
      'insert into frakt (frakt_id, fra_sted, til_sted, frakt_dato, status) values (?, ?, ?, ?, ?)',
      [frakt_id, fra_sted, til_sted, frakt_dato, status],
      (error, results) => {
        if (error) return console.error(error);
        // legger til frakter i frakttabellen utifra verdier i inputfelt på fraktleggtil
        connection.query(
          'insert into frakt_sykkel (frakt_id, sykkel_id) values (?, ?)',
          [results.insertId, sykkel_id],
          (error, results) => {
            if (error) return console.error(error);
            // legger til i frakt_sykkel for å kunne vise sykkelen det er koblet til.
            success();
          }
        );
      }
    );
  }
}

export let fraktService = new FraktService();
// Eksportering av spørringene og funksjonene så vi kan hente de frem i sidene
