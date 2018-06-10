fetch('https://swapi.co/api/films/').then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let dataFilms = data.results
        films(dataFilms);
    })
    .catch(function(error) {
        console.log('Problem fetch operation: ' + error.message);
    });

const Films = (title, episode, descr, director, release, people, indexImage, templatePeople) => {

    let template = `
    <div class="col-md-4 mt-4">
      <div class="card">
        <img class="card-img-top" src=${indexImage} alt="Card image cap">
        <h5 class="card-header">Episode ${episode}: ${title}</h5>
        <div class="card-body">
          <p class="card-text">${descr}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p class="d-inline font-weight-bold">Director: </p>${director}
          </li>
          <li class="list-group-item">
            <p class="d-inline font-weight-bold">Date Release: </p>${release}
          </li>
          <li class="list-group-item">
            <div class="dropdown show">
              <a class="btn btn-dark btn-block" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Characters
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <p class="text-center">${templatePeople}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
	  </div>`

    let sectionFilms = document.getElementById("row");
    sectionFilms.innerHTML += template;
};

const films = (dataFilms) => {
    dataFilms.forEach(function(element, index) {
        let imagesArray = ["./assets/images/a-new-hope.jpg", "./assets/images/attack-of-the-clones.jpg", "./assets/images/the-phantom-menace.jpg", "./assets/images/revenge-of-the-sith.jpg", "./assets/images/return-of-the-jedi.jpg", "./assets/images/the-empire-strikes-back.jpg", "./assets/images/the-force-awakens.jpg"]
        let indexImage = imagesArray[index];
        let title = element.title;
        let episode = element.episode_id;
        let descr = element.opening_crawl;
        let director = element.director;
        let release = element.release_date;
        let people = element.characters;

        let templatePeople = ``;
        people.forEach(function(characters) {
            templatePeople += `
                <a id="card-people" class="card-people" href="#modal" data-toggle="modal">${characters}</a>`
        });

        Films(title, episode, descr, director, release, people, indexImage, templatePeople);
    });
    let linksHTML = document.getElementsByClassName("card-people");
    let linksUrl = Array.from(linksHTML);

    linksUrl.forEach(function(item){
        item.addEventListener("click", requestModal)
    });
};

const requestModal = (event) => {
  let url= event.target.innerText
      fetch(url).then(function(response) {
          return response.json();
      })
      .then(function(data) {
          let name = data.name;
          let gender = data.gender;
          let hairColor = data.hair_color;
          let skinColor = data.skin_color;
          let eyeColor = data.eye_color;
          
          Modal(name, gender, hairColor, skinColor, eyeColor);
      })
      .catch(function(error) {
          console.log('Problem fetch operation: ' + error.message);
      });
  };

const Modal = (name, gender, hairColor, skinColor, eyeColor) => {

    const modalTemplate = `
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${name}</h5><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
    </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <p class="d-inline font-weight-bold">Gender: </p>${gender}
        </li>
        <li class="list-group-item">
          <p class="d-inline font-weight-bold">Hair Color: </p>${hairColor}
        </li>
        <li class="list-group-item">
          <p class="d-inline font-weight-bold">Skin Color: </p>${skinColor}
        </li>
        <li class="list-group-item"> 
          <p class="d-inline font-weight-bold">Eye Color: </p>${eyeColor}
        </li>
      </ul>`;

    const modalContainer = document.getElementById('modal-content');
    modalContainer.innerHTML = modalTemplate
};