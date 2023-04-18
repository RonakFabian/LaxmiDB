import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import locationEntryService from "../services/locationEntry.services";
import { AiOutlinePlusSquare } from 'react-icons/ai'

const TodoList = () =>
{
    const [modal, setModal] = useState(false);
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


    useEffect(() =>
    {
        getEntries();
    }, []);

    const toggle = () =>
    {
        setModal(!modal);
    }




    return (
        <>
            <div class="input-group p-2">
                {/* <input type="search" onChange={(e) => setSearch(e.target.value)} class="form-control rounded" placeholder="Search Entry.." aria-label="Search" aria-describedby="search-addon" /> */}
                {/* <button type="button" class="btn btn-primary">    <i class="fas fa-search"></i></button> */}
            </div>
            <div className="header text-center">
                <h3>Location Entry</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)} ><AiOutlinePlusSquare /> Create Task</button>
            </div>
            <div className="container justify-content-center">
                {/* todos */}
            </div>
            <CreateTask toggle={toggle} modal={modal} />

            <pre>
                {JSON.stringify(entries, undefined, 2)}
            </pre>


        </>
    );
};

export default TodoList;