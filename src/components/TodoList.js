import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import locationEntryService from "../services/locationEntry.services";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdSearch } from 'react-icons/md';
import EditTask from '../modals/EditTask';


const TodoList = ({ entryID, setEntryID }) =>
{
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");
    const [modalUpdate, setModalUpdate] = useState(false);
    const [entries, setEntries] = useState([]);




    const getEntries = async () =>
    {
        await getDocs(collection(db, "laxmi-db"))
            .then((querySnapshot) =>
            {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setEntries(newData);
                console.log(entries, newData);
            })
    }
    const deleteHandler = async (id) =>
    {
        await locationEntryService.deleteLocationEntry(id);
        getEntries();
    }

    useEffect(() =>
    {
        getEntries();
    }, []);

    const toggle = () =>
    {
        setModal(!modal);
    }

    const toggleUpdate = () =>
    {
        setModalUpdate(!modalUpdate);

    }

    const locate = (doc) =>
    {
        let url = "geo:" + doc.latitude + "," + doc.longitude + "?q=" + doc.latitude + "," + doc.longitude;
        console.log(url);
        window.open(url);
    }


    return (
        <>
            <div class="input-group p-2">
                <input type="search" onChange={(e) => setSearch(e.target.value)} class="form-control rounded" placeholder="Search Entry.." aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-primary"><MdSearch /></button>
            </div>
            <div className="header text-center">
                <h3>Location Entry</h3>
                <button className="btn btn-primary mt-2 m-2 pb-2" onClick={() => setModal(true)} ><AiOutlinePlusSquare /> Create Task</button>
                <button className="btn btn-secondary mt-2 m-2  pb-2" onClick={() => getEntries()} ><IoMdRefresh />Refresh</button>
            </div>

            <CreateTask toggle={toggle} modal={modal} refreshTodos={getEntries} />


            <div className='mx-auto  justify-content-center text-center'>
                {entries.filter((doc) => { return search.toLowerCase === '' ? doc : (doc.taskName.toLowerCase().includes(search) || doc.description.toLowerCase().includes(search)); }).map((doc, index) =>
                {
                    return (
                        <>
                            <div class="card" key={doc.id}>
                                <div class="card-body ">
                                    <h1 class="card-title header-text">{doc.taskName}</h1>
                                    <p class="card-text">{doc.description}</p>
                                    <button className='btn btn-primary pb-2' onClick={() => locate(doc)}><MdLocationPin /></button>
                                    <button className='btn btn-primary pb-2' onClick={() => { setEntryID(doc.id); toggleUpdate(); }}><MdEdit /></button>
                                    <button className='btn btn-primary pb-2' onClick={(e) => deleteHandler(doc.id)}><MdDelete /></button>
                                </div>
                            </div>

                        </>)
                })}
            </div>

            <EditTask modal={modalUpdate} toggle={toggleUpdate} entryID={entryID} entries={entries} refreshTodos={getEntries} />



        </>
    );
};

export default TodoList;