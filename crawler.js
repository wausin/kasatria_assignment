const puppeteer = require("puppeteer");
var GenderApi = require("gender-api.com-client");

// Calls the given operation that kicks off a network request,
// then waits for the page to finish loading

var fb_username = "";
var fb_password = "";

async function genderApi(name) {
  gender_api_key = "C7qBHT5jZUwNpWuRsr6NZVEqo7DGDPBJR6Uf";
  gender_api_url = "https://gender-api.com/";

  var genderApiClient = new GenderApi.Client(gender_api_key);

  var gender = [];
  genderApiClient.getByFirstName(name, function (response) {
    gender.push(response.gender);
    // console.log(response);
  });
  //   console.log(gender);
  return gender;
}
(async () => {
  // set chromium headles or not
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.facebook.com");
  //   input username/email
  await page.waitForSelector("input[name=email]");
  await page.focus("input[name=email]");
  await page.keyboard.type(fb_username);

  //   input password
  await page.waitForSelector("input[type=password]");
  await page.focus("input[type=password]");
  await page.keyboard.type(fb_password);

  //   login process
  await Promise.all([
    page.keyboard.press("Enter"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  //   go to page firend list
  await page.goto("https://www.facebook.com/friends/list");

  //   process friend list to json data
  div_all_friends = await page.evaluate(() => {
    var element = document.querySelector("div .hwciadxw");

    var children = element.children;
    var datas = [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].hasAttribute("data-visualcompletion")) {
        fren_link = children[i].children[0].href;
        fren_svg =
          children[i].children[0].children[0].children[0].children[0].innerHTML;
        fren_name =
          children[i].children[0].children[0].children[0].children[0]
            .firstElementChild.ariaLabel;

        datas.push({
          fb_link: fren_link,
          fb_svg: fren_svg,
          fb_name: fren_name,
          fb_gender: genderApi("nurul")[0] ?? "",
        }); //children[i].innerHTML
      }
      //   datas.push(children[i].hasAttribute("data-visualcompletion"));
    }

    return datas; //datas; //_array.map((h, i) => h);
  });

  new_data = div_all_friends.map((d) => {
    d.fb_gender = genderApi(d.fb_name);
    return d;
  });
  console.log(new_data);

  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
