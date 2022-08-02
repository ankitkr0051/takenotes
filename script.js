const addButton = document.querySelector("#add");

const updateLSData = ()=>{
     const textAreaData=document.querySelectorAll('textarea');
     const notes = [];
  
     textAreaData.forEach((note)=>{
           return notes.push(note.value);
     })
  //console.log(notes);
  //to add to local storage
    localStorage.setItem('notes',JSON.stringify(notes));
  }


// text already present hai ki nahi to check
const addNewNote = (text = '') => {
  const note = document.createElement('div');
  note.classList.add('note');

// dynamic div creation
  const htmlData = `    
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"> </i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}" placeholder =" Note here.... " ></textarea>`;
      //if there is text already then call hidden otherwise let them write
      //main to save --- text area to write content

    //afterbegin --- innerhtml --- can be used
      note.insertAdjacentHTML('afterbegin',htmlData);
      //console.log(note);

      // getting the refrences ---
      const editButton = note.querySelector('.edit');
      const delButton = note.querySelector('.delete');
      const mainDiv = note.querySelector('.main');
      const textArea = note.querySelector('textarea');

      //deleting the node 
      delButton.addEventListener('click',()=>{
         note.remove();
      })

      //toggle between main and textarea using edit button 
      textArea.value = text; // if want to get some default text
      mainDiv.innerHTML= text;
     
      editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
      })

     //adding test to main to save it from text area
     textArea.addEventListener('change',(event)=>{
          const value = event.target.value;
          //console.log('value');
          mainDiv.innerHTML= value;

         updateLSData();//update the local storage data
     })

    //Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.
    document.body.appendChild(note);
};

// Getting data from local storage --- not work **********
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){ notes.forEach((note) => addNewNote(note))};
//*********************************************************
addButton.addEventListener('click', () => addNewNote());