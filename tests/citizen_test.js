var request = require("supertest");

describe("POST /addCitizen", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/addCitizen")
      .send({
        first_name: "john",
        middle_name: null,
        surname: "Kowalski",
        sex: "M",
        PESEL: "0000000000",
        date_of_birth: "2020-01-01",
        marital_status: "KAWALER",
        education: "ŚREDNIE",
        home_address: {
          street: "Polna",
          postal_code: "80-000",
          city: "Gdansk",
          district: "Gdansk",
          commune: "Gdansk",
          voivodeship: "Pomorskie",
          country: "Polska",
        },
        registered_address: {
          street: "Polna",
          postal_code: "80-000",
          city: "Gdansk",
          district: "Gdansk",
          commune: "Gdansk",
          voivodeship: "Pomorskie",
          country: "Polska",
        },
        company: [
          {
            name: "Renault",
            NIP: "999012030213",
            contract: [
              {
                type: "UOP",
                income: 30000,
                currency: "PLN",
              },
            ],
          },
        ],
        family: [
          {
            type: "PARTNER",
            PESEL: "0000000000",
            date_of_birth: "2020-01-01",
            sex: "K",
          },
          {
            type: "DZIECKO",
            PESEL: "0000000000",
            date_of_birth: "2020-01-01",
            sex: "M",
          },
        ],
        accomodation: {
          with_parents: true,
          num_of_residents: 3,
          house_type: "BLOK",
        },
        additional_info: {
          internet_access: true,
          family_income: 90000,
          num_of_cars_in_family: 2,
          disability: null,
        },
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
