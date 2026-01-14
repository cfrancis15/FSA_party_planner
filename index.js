// === State ===
let events = []
let selectedEvent = null

const API = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2511-FTB-CT-WEB-PT/events'

// === State Management ===

/** Updates state with all events from the API */
async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    console.log(events)
    render();
  } catch (e) {
    console.log(e);
  }
}

getEvents()


//makes a party the selected party
async function getEvent(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.log(e);
  }
}


//shows party names
function renderPartyNames(){
  const $ul = document.createElement('ul')

  events.forEach(event=>{
    const $li = document.createElement("li")
    $li.textContent = event.name
    //adding event listener to each thing we've created here that we want to be clickable
    $li.addEventListener('click',()=>{
      //when it is clicked getEvent is fed the event's id and is made the selected Event
      getEvent(event.id)
    })

    $ul.appendChild($li)
  })
    
  return $ul

}

//shows information about the party after it is clicked
function renderPartyInfo(){
  if(selectedEvent === null){
    const $p = document.createElement('p')
    $p.innerHTML = "Please select party to see details!"
    return $p
  }
  
  const $div = document.createElement("div")
  $div.innerHTML = `
  <strong><p>${selectedEvent.name}</p></strong>
  <p>${selectedEvent.date}</p>
  <p>${selectedEvent.location}</p>
  <p>${selectedEvent.description}</p>
  <p>${selectedEvent.id}</p>
  `
  return $div
}






//replacing what we built with the placeholders we stuck in there per function call

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <main>
      <h1>Party Planner</h1>
      <section>
        <h2>Upcoming Parties</h2>
        <party-list></party-list>
      </section>

      <section>
        <h2>Party Details</h2>
        <party-info></party-info>
        
      </section>
    </main>
  `;
  $app.querySelector("party-list").replaceWith(renderPartyNames());
  $app.querySelector("party-info").replaceWith(renderPartyInfo())
}

