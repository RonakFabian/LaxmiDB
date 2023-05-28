
import React, { useEffect, useState } from 'react';
import locationEntryService from "../services/locationEntry.services";
import { MdLocationPin, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import ConfirmDelete from '../modals/ConfirmDelete';

function TodoCard({ doc, index, toggleUpdate, setEntryID, getEntries, isModalOpen, ToggleDeleteModal })
{


  const deleteHandler = async (id) =>
  {
    await locationEntryService.deleteLocationEntry(id);
    getEntries();
  }

  const locate = (doc) =>
  {
    let url = "geo:" + doc.latitude + "," + doc.longitude + "?q=" + doc.latitude + "," + doc.longitude;
    console.log(url);
    window.open(url);
  }

  let colors = ["peach", "blue", "green", "yellow"];
  let btnColors = ["dark-peach", "dark-blue", "dark-green", "dark-yellow"];

  return <>

    {

      <div className="card-outer">

        <div className={"btn btn-secondary number " + btnColors[index % 4]}>
          <div>{index + 1 + " "}</div>
        </div>

        <div class="card w-100" key={doc.id}>
          <div class={colors[index % 4] + " card-body w-100"}>
            <div className="d-flex flex-wrap w-100">
              <div className="col">
                <h1 class="card-title ">{doc.taskName}</h1>
                <p class="card-text">{doc.description}</p>
              </div>
              <div className="flex-column-reverse">
                <button className={'btn btn-primary button-new  pb-2 br-2 ' + btnColors[index % 4]} onClick={() => locate(doc)}><MdLocationPin /></button>
                {/* <button className={'btn btn-primary button-new  pb-2 br-2 ' + btnColors[index % 4]} onClick={(e) => deleteHandler(doc.id)}><MdDelete /></button> */}
                <button className={'btn btn-primary button-new  pb-2 br-2 ' + btnColors[index % 4]} onClick={ToggleDeleteModal}><MdDelete /></button>
                <button className='btn btn-primary pb-2' onClick={() => { setEntryID(doc.id); toggleUpdate(); }}><MdEdit /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    }
    {/* <EditTask modal={modalUpdate} toggle={toggleUpdate} entryID={entryID} entries={entries} refreshTodos={getEntries} /> */}
    <ConfirmDelete isModalOpen={isModalOpen} ToggleDeleteModal={ToggleDeleteModal} getEntries={getEntries} docID={doc.id} />

  </>

}

export default TodoCard;