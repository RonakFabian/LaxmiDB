import React, { useState, useEffect } from 'react';
import { db } from "../FirebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import locationEntryServices from '../services/locationEntry.services';

const EditTaskPopup = ({ modal, toggle, entryID, getEntries }) =>
{
    const [taskName, setTaskName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');

    const Refresh = () =>
    {
        getEntries();
        setTaskName(taskName);
        setDescription("Set New Description...");
    }
    useEffect(() =>
    {
        Refresh();

    }, [modal, taskName]);

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




    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        const newLocationEntry = {
            taskName,
            description,
            latitude,
            longitude
        };
        console.log(newLocationEntry);
        await locationEntryServices.updateLocationEntry(entryID, newLocationEntry);
        toggle();
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
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
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
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