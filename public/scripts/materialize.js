const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const raceList = document.querySelector('#raceTable');
const raceTable = document.querySelector('.RaceList');
const racerTable = document.querySelector('#racerTable');

const setupUI = (user) => {
  if(user){
    const html = `
      <div>Logged in as ${user.email} </div> 
    `;
    accountDetails.innerHTML = html;
    //Toggle UI Elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    document.querySelector('.teknelerimView').style.display = 'block';
    document.querySelector('.RacerList').style.display = 'block';
    document.querySelector('.racerListModal').style.display = 'block';

  }else{
    //Hide Account Info
    accountDetails.innerHTML = '';
    //Toggle UI Elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    document.querySelector('.teknelerimView').style.display = 'none';
    document.querySelector('.RacerList').style.display = 'none';
    document.querySelector('.racerListModal').style.display = 'none';

    
    
  }
}

//Setup Guides

const setupGuides = (data) => {

  if(data){
    let html = '';
    data.forEach(doc => {
      const yatch = doc.data();
      const li = `
        <li data-id = ${doc.id}>
          <div class = "collapsible-header white lighten-4"><b>${yatch.yatchName}</b> &nbsp;&nbsp;&nbsp;&nbsp; <a class="waves-effect waves-light btn red" onclick='deleteYacth()'>SİL</a></div>
          <div class = "collapsible-body white">${yatch.firstName}</div>
          <div class = "collapsible-body white">${yatch.portAndCountry}</div>
          <div class = "collapsible-body white">${yatch.sailNumber}</div>
          <div class = "collapsible-body white">${yatch.ircRating}</div>
          <div class = "collapsible-body white">${yatch.nonIrcRating}</div>
          <div class = "collapsible-body white">${yatch.yearOfConstruction}</div>
          <div class = "collapsible-body white">${yatch.overallLength}</div>
          <div class = "collapsible-body white">${yatch.spinnaker}</div>
          <div class = "collapsible-body white">${yatch.foldingPropeller}</div>
          <div class = "collapsible-body white">${yatch.dateOfIssue}</div>
          <div class = "collapsible-body white">${yatch.hullColor}</div>
          <div class = "collapsible-body white">${yatch.rigType}</div>
          <div class = "collapsible-body white">${yatch.hullMaterial}</div>
          <div class = "collapsible-body white">${yatch.marinaPonton}</div>
          <div class = "collapsible-body white">${yatch.advertisement}</div>
          <div class = "collapsible-body white">${yatch.yatchOwnerName}</div>
          <div class = "collapsible-body white">${yatch.address}</div>
          <div class = "collapsible-body white">${yatch.telephone}</div>
          <div class = "collapsible-body white">${yatch.mobile}</div>
          <div class = "collapsible-body white">${yatch.mail}</div>


        </li>
        
      `;
      html += li;
    });

    guideList.innerHTML = html;
  }else{ //Giriş yapılmadığında setupGuides içine boş array verdiğimiz için uzunluk 0 olduğunda burası çalışacak.
    guideList.innerHTML = '<h3 class = "center-align blue-text">Lütfen Giriş Yapınız!</h3>';
  }
}

//Setup Racers
const setupRacers = (data) => {
  if(data){
    let html = '';
    data.forEach(doc => {
      const racer = doc.data();
      const li = `
        <tr data-id = ${doc.id}>
          <td>${racer.racerName}</td>
          <td>${racer.racerLicenceNumber}</td>
          <td>${racer.racerClub}</td>
          <td>${racer.racerMobile}</td>
          <td><a class="waves-effect waves-light btn red" onclick='deleteRacer()'>SİL</a></td>
        </tr>  
      `;
      html += li;
    });
    
    racerTable.innerHTML = html;
    
  }else{ // Giris Yapilmadigi durumlar icin
    guideList.innerHTML = '';
  }
};


//Delete Racer
function deleteRacer(){
  event.stopPropagation();
  var user = firebase.auth().currentUser; // Burdan anlik kullaniciyi cekebiliyoruz.
  let id = event.target.parentElement.parentElement.getAttribute('data-id');
  db.collection('users').doc(user.uid).collection('racer').doc(id).delete();
}
//Delete Yacth
function deleteYacth(){
  event.stopPropagation();
  var user = firebase.auth().currentUser;
  let id = event.target.parentElement.parentElement.getAttribute('data-id');
  db.collection('users').doc(user.uid).collection('yatch').doc(id).delete();
  console.log('Tekne Silindi ! ');
}

// Error Catching

const logOut = document.querySelector('#logout');
logOut.addEventListener('click',(e) => {
  location.reload(true);
})

const lostMyPassword = document.querySelector('.lostMyPassword');
lostMyPassword.addEventListener('click', (e) => {
  e.preventDefault();

  const lostedMail = document.querySelector('#lostedMail').value;
  const errorOrSuccess = document.querySelector('#errorOrSuccess');

  auth.sendPasswordResetEmail(lostedMail).then(function() {
    errorOrSuccess.style.color = 'blue';
    errorOrSuccess.innerHTML = "Lütfen Mailinizi Kontrol Ediniz";
  }).catch(function(error) {
     errorOrSuccess.style.color = 'red';
     errorOrSuccess.innerHTML = error.message;
  });
})









document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  
  });