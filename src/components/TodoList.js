import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import locationEntryService from "../services/locationEntry.services";
import { AiOutlinePlusSquare } from 'react-icons/ai';
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
                <button type="button" class="btn btn-primary"><i class="fas fa-search"></i></button>
            </div>
            <div className="header text-center">
                <h3>Location Entry</h3>
                <button className="btn btn-primary mt-2 m-2" onClick={() => setModal(true)} ><AiOutlinePlusSquare /> Create Task</button>
                <button className="btn btn-secondary mt-2 m-2 " onClick={() => getEntries()}  >Refresh</button>
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
                                    <button className='btn btn-primary' onClick={() => locate(doc)}>Locate</button>
                                    {/* <button className='btn btn-primary' onClick={() => { setEntryID(doc.id); toggleUpdate(); }}>Edit</button> */}
                                    <button className='btn btn-primary' onClick={(e) => deleteHandler(doc.id)}>Delete</button>
                                </div>
                            </div>

                        </>)
                })}
            </div>

            <EditTask modal={modalUpdate} toggle={toggleUpdate} entryID={entryID} getEntries={getEntries} />



        </>
    );
};

export default TodoList;