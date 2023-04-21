import React, { useState, useEffect } from 'react';
import { db } from "../FirebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import locationEntryServices from '../services/locationEntry.services';

const EditTaskPopup = ({ modal, toggle, entryID, refreshTodos }) =>
{
    const [taskName, setTaskName] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([]);
    const [rerender, setRerender] = useState("");




    useEffect(() =>
    {
        setTaskName("");
        setDescription("");
        refreshTodos();
    }, [modal, rerender]);

    const handleChange = (e) =>
    {

        const { name, value } = e.target

        if (name === "taskName")
        {
            setTaskName(value)
        }

        else
        {
            setDescription(value)
        }


    }
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





    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        e.currentTarget.disabled = true;
        getEntries();
        let a = entries;
        let c = a.find(c => c.id == entryID);
        console.log(c);
        const newLocationEntry = {
            taskName: taskName,
            description: description,
            latitude: c.latitude,
            longitude: c.longitude
        };
        console.log(newLocationEntry);
        await locationEntryServices.updateLocationEntry(entryID, newLocationEntry);
        toggle();
        setTimeout(() =>
        {
            setRerender(Math.random);

        }, 1500);

    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" placeholder='Enter New Task Name...' />
                </div>
                {/* <div className="form-group">
                    <label>Latitude</label>
                    <input type="number" className="form-control" value={latitude} onChange={handleChange} name="latitude" />
                </div>
                <div className="form-group">
                    <label>Longitude</label>
                    <input type="number" className="form-control" value={longitude} onChange={handleChange} name="longitude" />
                </div> */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description" placeholder='Enter New Description...'></textarea>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;