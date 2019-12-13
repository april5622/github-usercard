/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios
.get("https://api.github.com/users/april5622") 
  .then((res) => {
    const gitInfo = (res.data);
    cards.appendChild(userInfo(res));
    console.log(gitInfo);
  })
  .catch((err) => {
    console.log(`You hit an error`, err);
  });

 
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
 "HeyMichelle",
 "rachellsincere",
 "tlewandowski18",
 "CJStryker",
 "candaceyw",
];

function followersProfile(profileURL) {
  const followersPromise = axios.get(`https://api.github.com/users/${profileURL}/followers`)
  followersPromise  
    .then(res => {
      const followers = res.data
      followers.forEach(profile => {
        const profilePromise = axios.get(profile.url)
        profilePromise
          .then(res => {
            cards.appendChild(userInfo(res.data))
          })
          .catch(err => {
            console.log('You hit an error', err)
          })
      })
    })

    .catch(err => {
      console.log('You hit an error', err)
    })
}


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cards = document.querySelector('.cards');


function userInfo(obj){
  const cardDiv = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const h3Name = document.createElement('h3');
  const userName = document.createElement('p');
  const userLocation = document.createElement('p');
  const profile = document.createElement('p');
  const addressLink = document.createElement('a');
  const followerCount = document.createElement('p');
  const followingCount = document.createElement('p');
  const userBio = document.createElement('p');

  //console.log(obj)

  cardDiv.classList.add('card');
  cardInfo.classList.add('card-info');
  h3Name.classList.add('name');
  userName.classList.add('username');

  userImg.src = obj.data.avatar_url;
  h3Name.textContent = obj.data.name;
  userName.textContent = obj.data.login;
  userLocation.textContent = `Location: ` + obj.data.location; //obj.location
  profile.textContent = `Profile: ` + obj.data.html_url; //obj.html_url
  followerCount.textContent = `Followers: `+ obj.data.followers; //obj.followers_url
  followingCount.textContent = `Following: ` + obj.data.following; //obj.following_url
  userBio.textContent = `Bio: ` + obj.data.bio;//obj.bio

  cardDiv.appendChild(userImg)
  cardDiv.appendChild(cardInfo);

  cardInfo.appendChild(h3Name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followerCount);
  cardInfo.appendChild(followingCount);
  cardInfo.appendChild(userBio);

  profile.appendChild(addressLink);

  return cardDiv;

};


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
