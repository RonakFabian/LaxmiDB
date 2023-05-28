import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import locationEntryService from "../services/locationEntry.services";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { MdLocationPin, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import EditTask from '../modals/EditTask';
import TodoCard from '../components/TodoCard';



const TodoList = ({ entryID, setEntryID }) =>
{
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");
    const [modalUpdate, setModalUpdate] = useState(false);
    const [entries, setEntries] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const ToggleDeleteModal = () => { SetModalOpen(!isModalOpen); }


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

    useEffect(() => { getEntries(); }, []);

    const toggle = () => { setModal(!modal); }
    const toggleUpdate = () => { setModalUpdate(!modalUpdate); }

    const locate = (doc) =>
    {
        let url = "geo:" + doc.latitude + "," + doc.longitude + "?q=" + doc.latitude + "," + doc.longitude;
        console.log(url);
        window.open(url);
    }





    return (
        <>
            <div className='sticky '>
                <div class="input-group p-4 ">
                    <button type="button" class="btn btn-secondary"><MdSearch /></button>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} class="form-control rounded" placeholder="Search Entry.." aria-label="Search" aria-describedby="search-addon" />
                </div>
                <div className=" text-center pb-4 ">
                    <button className="btn btn-primary  m-2 pb-2" onClick={() => setModal(true)} ><AiOutlinePlusSquare /> Create Task</button>
                    <button className="btn btn-secondary  m-2  pb-2" onClick={() => getEntries()} ><IoMdRefresh />Refresh</button>
                </div>
            </div>

            <CreateTask toggle={toggle} modal={modal} refreshTodos={getEntries} />

            <div className='mx-auto '>
                {entries.filter((doc) => { return search.toLowerCase === '' ? doc : (doc.taskName.toLowerCase().includes(search) || doc.description.toLowerCase().includes(search)); }).map((doc, index) =>
                {
                    return (<TodoCard {...{ doc }} index={index} toggleUpdate={toggleUpdate} setEntryID={setEntryID} getEntries={getEntries} isModalOpen={isModalOpen} ToggleDeleteModal={ToggleDeleteModal} />)
                })}
            </div>

        </>
    );
};

export default TodoList;