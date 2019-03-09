const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const raceList = document.querySelector('#raceTable');
const raceTable = document.querySelector('.RaceList');

const setupUI = (user) => {
  if(user){
    const html = `
      <div>Logged in as ${user.email} </div> 
    `;
    accountDetails.innerHTML = html;
    //Toggle UI Elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    raceTable.style.display = 'block';
  }else{
    //Hide Account Info
    accountDetails.innerHTML = '';
    //Toggle UI Elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    raceTable.style.display = 'none';
    
  }
}


//Setup Guides

const setupGuides = (data) => {

  if(data.length){
    let html = '';
    data.forEach(doc => {
      const yatch = doc.data();
      const li = `
        <li>
          <div class = "collapsible-header white lighten-4">${yatch.yatchName}</div>
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
        </li>
      `;
      html += li;
    });

    guideList.innerHTML = html;
  }else{ //Giriş yapılmadığında setupGuides içine boş array verdiğimiz için uzunluk 0 olduğunda burası çalışacak.
    guideList.innerHTML = '<h3 class = "center-align blue-text">Lütfen Giriş Yapınız!</h3>';
  }
}

//Setup Races

const setupRaces = (data) => {

  if(data){
    let html = '';
    data.forEach(doc => {
      const race = doc.data();
      const li = `
      <tr>
        <td>${race.raceName}</td>
        <td>${race.start}</td>
        <td>${race.talimatlar}</td>
        <td>${race.tarih}</td>
        <td><button class="btn waves-effect waves-light orange ${race.situation}" type="submit" name="action">Göster</button></td>
        <td></td>
        </tr>  
      `;
      html += li;
    });
    raceList.innerHTML = html;
  }else{ // Giris Yapilmadigi durumlar icin
    guideList.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });