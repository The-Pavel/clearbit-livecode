const authorization = "SORRY, can't put my key on GitHub, or bad people can scrape it :( Please get your own at https://dashboard.clearbit.com/signup // it's free!";
// TODO

// queryselect the form and input field
const inputField = document.querySelector("#clearbitEmail");
const form = document.querySelector("#formContainer");


const displayUserInfo = (person) => {
  // filter the data we care about
  const usefulData = {};
  usefulData.userName = person.name.fullName;
  usefulData.userSite = person.site;
  usefulData.userBio = person.bio;
  usefulData.userLocation = person.location;

  // update the elements of on the page
  document.querySelector("#userAvatar").src = person.avatar
  const array = Object.keys(usefulData);
  array.forEach((key) => {
    const currentElement = document.querySelector(`#${key}`);
    currentElement.innerText = usefulData[key];
  });
};

const populateWebsite = () => {
  // save the email input into a variable
  // fetch the API with email variable
  const email = inputField.value;
  fetch(`https://person.clearbit.com/v2/combined/find?email=${email}`, {headers: { Authorization: authorization }})
  .then(response => response.json())
  .then((data) => {
    displayUserInfo(data.person);
  });
};

const check = (e) => {
  // need to prevent the default behaviour of `submit` event
  e.preventDefault();
  populateWebsite();
};

// add event listener to the form 'submit'
form.addEventListener('submit', check);
