import request from "supertest";
import app from "../../index";

test("POST /addCitizen", async () => {
  const data = {
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
  };

  await request(app)
    .post("/addCitizen")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      // expect(response.body.title).toBe(data.title)
      // expect(response.body.content).toBe(data.content)

      // Check the data in the database
      const post = await Post.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.first_name).toBe(data.first_name);
      expect(post.surname).toBe(data.surname);
    });
});
