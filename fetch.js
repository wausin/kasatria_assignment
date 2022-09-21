var fbToken =
  "EAAGg2ZA3TPigBAISlKuju2BLDtLCxPkHDYnw05ZCkxBaI4bBGmEnNvmU1ZCZC6H3wZAxvQdQTSzX6SdDIxuwZAYoi5DOHhEphfPldbaNBY35ZC4RZAr9eZAP6Ago4ZBk7MWTgSSEiGv5v7yBRZB1FscUvTJDbr0mQLccfhm3JV9X9ccwKT6IoFvOLDiFNZCfvZBmQNRekBXY1j5KFAQEqJ3mtMGdxSIUB8ZCWZA6TMYQm0zUZCelIGiabTjSXEYL";

async function scrap(params) {
  return await fetch("api.php", {
    method: "GET",
    // headers: {
    //   "X-Requested-With": "XMLHttpRequest",
    // },
  })
    .then((response) => {
      return response.json();
      // console.log(response.json())
    })
    .then((data) => {
      console.log(data);
      // level.setChoices(data, 'value', 'label', true)
      return data;
      // success(data)
    })
    .catch((error) => {
      // failure(error)
      return error;
      // console.log(error)
    });
}

scrap();
