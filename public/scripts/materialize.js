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
          <div class = "collapsible-header white lighten-4"><b>${yatch.yatchName}</b> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="waves-effect waves-light btn red modal-trigger" data-target = "are-you-sure-modal" onclick="setModalDocID('${doc.id}')">SİL</a></div>
          <div class = "collapsible-body white"><b>First Name </b> : ${yatch.firstName}</div>
          <div class = "collapsible-body white"><b>Port And Country </b>: ${yatch.portAndCountry}</div>
          <div class = "collapsible-body white"><b>Sail Number </b>: ${yatch.sailNumber}</div>
          <div class = "collapsible-body white"><b>IRC Rating </b>: ${yatch.ircRating}</div>
          <div class = "collapsible-body white"><b>NON IRC Rating </b>: ${yatch.nonIrcRating}</div>
          <div class = "collapsible-body white"><b>Year Of Construction </b>: ${yatch.yearOfConstruction}</div>
          <div class = "collapsible-body white"><b>Overall Length </b>: ${yatch.overallLength}</div>
          <div class = "collapsible-body white"><b>Spinnaker </b>: ${yatch.spinnaker}</div>
          <div class = "collapsible-body white"><b>Folding Propeller </b>: ${yatch.foldingPropeller}</div>
          <div class = "collapsible-body white"><b>Date Of Issue </b>: ${yatch.dateOfIssue}</div>
          <div class = "collapsible-body white"><b>Hull Color </b>: ${yatch.hullColor}</div>
          <div class = "collapsible-body white"><b>Rig Type </b>: ${yatch.rigType}</div>
          <div class = "collapsible-body white"><b>Hull Material </b>: ${yatch.hullMaterial}</div>
          <div class = "collapsible-body white"><b>Marina Ponton </b>: ${yatch.marinaPonton}</div>
          <div class = "collapsible-body white"><b>Advertisement </b>: ${yatch.advertisement}</div>
          <div class = "collapsible-body white"><b>Yatch Owner Name </b>: ${yatch.yatchOwnerName}</div>
          <div class = "collapsible-body white"><b>Address </b>: ${yatch.address}</div>
          <div class = "collapsible-body white"><b>Telephone </b>: ${yatch.telephone}</div>
          <div class = "collapsible-body white"><b>Mobile </b>: ${yatch.mobile}</div>
          <div class = "collapsible-body white"><b>Mail </b>: ${yatch.mail}</div>


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
          <td><a class="waves-effect waves-light btn red modal-trigger" data-target="are-you-sure-racer-modal" onclick="setRacerModalID('${doc.id}')">SİL</a></td>
        </tr>
      `;
      html += li;
    });

    racerTable.innerHTML = html;

  }else{ // Giris Yapilmadigi durumlar icin
    guideList.innerHTML = '';
  }
};

var modalID;
var racerID;
//Delete Racer
function deleteRacer(){
  event.stopPropagation();
  var user = firebase.auth().currentUser; // Burdan anlik kullaniciyi cekebiliyoruz.
  //let id = event.target.parentElement.parentElement.getAttribute('data-id');
  db.collection('users').doc(user.uid).collection('racer').doc(racerID).delete();

  var Toast2= '<span>Yarışçı Silindi</span>';
  M.toast({html : Toast2});

  const modal = document.querySelector('#are-you-sure-racer-modal');
  M.Modal.getInstance(modal).close();
}
//Delete Yacth
function deleteYacth(){
  event.stopPropagation();
  var user = firebase.auth().currentUser;
  //let id = event.target.parentElement.parentElement.getAttribute('data-id');
  db.collection('users').doc(user.uid).collection('yatch').doc(modalID).delete();

  //Silindi Bildirimi
  var Toast2= '<span>Tekne Silindi</span>';
  M.toast({html : Toast2});

  //Silindikten sonra Modal Kapama
  const modal = document.querySelector('#are-you-sure-modal');
  M.Modal.getInstance(modal).close();
}

function setModalDocID(id){
  modalID = id;
  console.log(modalID);
}
function setRacerModalID(id){
  racerID = id;
  console.log(racerID);
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
