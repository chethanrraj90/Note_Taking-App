import React from 'react'
import noGroupSelectedImg from '../../images/noGroupSelected.svg';
import './notesListing.css';
import sendMessageIcon from './sendMessageIcon.svg';
import { useState, useRef } from 'react';
import backArrow from './back-arrrow.svg'

let allCurrentNotes = {};

function NoteBlock(props){
  let dateTime = new Date(props.dateTime);
  return (
    <div className='noteBlock'>
      <div className='dateTime'>
        {dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} <br/>
        {dateTime.getDay() + " " + dateTime.toLocaleString('en-US', { month: 'long'}) + " " + dateTime.getFullYear()}
      </div>
      <div className='note'>
        {props.note}
      </div>
    </div>
  )
}

export default function NotesListing(props) {
  let seletedGroupObj = props.all_groups.filter((grp) => grp.id == props.selectedGroup)[0];
  let noteRef = useRef('');
  
  // get data from local storage
  allCurrentNotes = JSON.parse(localStorage.getItem('notes'));
  if(allCurrentNotes == undefined){
    allCurrentNotes = {};
  }
  let [allNotes, setAllNotes] = useState(allCurrentNotes);

  function saveNote(){
    if(noteRef.current.value.trim() == ""){
      return ;
    }

    let note = {
      dateTime: new Date().toString(),
      note: noteRef.current.value
    }

    noteRef.current.value="";

    if (Object.keys(allCurrentNotes).includes(seletedGroupObj.id)){
      allCurrentNotes[seletedGroupObj.id].push(note);
    }
    else{
      allCurrentNotes = {...allCurrentNotes, [seletedGroupObj.id]:[note] };
    }
    setAllNotes(allCurrentNotes);
    console.log(allCurrentNotes);
    localStorage.setItem('notes', JSON.stringify(allCurrentNotes));
  }

  return (
    <section className='noteSection'>
        {!props.selectedGroup ?
          <div className='noGroupSelectedSection'>
            <div className='messageWrapper'>
              <img style={{width: "100%"}} src={noGroupSelectedImg}></img>
              <h1 className='pocketNotesHeading'>Pocket Notes</h1>
              <p>Send and receive messages without keeping your phone online.
                <br/>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <div className='encryptionMsg'>
              <i className="fa fa-lock"></i> end-to-end encrypted
            </div>
          </div>
          :
          <div className='NotesListingInnerWrapper'>
            <div className='notesIconBar'>
              {!props.isDesktop && 
                <div className='backIconWrapper' onClick={() => props.setSelectedGroup((selected) => !selected)}>
                    <img src={backArrow}/>
                </div> 
              }
              <div style={{background:seletedGroupObj.color}} className='navGroupIcon'>
                  {seletedGroupObj.name.slice(0,2).toUpperCase()}
              </div>
              <div className='navGroupName'>
                  {seletedGroupObj.name}
              </div>
            </div>

            <div className='notesListing'>
              {Object.keys(allNotes).includes(seletedGroupObj.id) && allNotes[seletedGroupObj.id].map((note) => (
                <NoteBlock key={note.dateTime} dateTime={note.dateTime} note={note.note}/>
              ))}
            </div>

            <div className='notesInputWrapper'>
              <textarea ref={noteRef} className='notesInputArea' placeholder='Enter Your Text Here...' onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault()
                            saveNote()
                        }
                    }}></textarea>
              <img onClick={saveNote} className='sendMessageIcon' src={sendMessageIcon} />
            </div>

          </div>
        }
    </section>
  )
}
