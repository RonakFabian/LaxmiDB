import React, { useState } from 'react';
import EditTask from '../modals/EditTask'

const Card = ({ taskObj }) =>
{
    const [modal, setModal] = useState(false);

    let url = ""
    const toggle = () =>
    {
        setModal(!modal);
        console.log("cliccked");
    }



    const Locate = () =>
    {


    }


    return (
        <div class="card justify-content-center w-100 mt-2 md-2 p-2">
            <div class="task-holder top-border">
                < div class="text-center  mb-3" >
                    <h3 class=" p-2 header-text">{taskObj.Name}</h3>
                </div>
                <div><p className="mt-1">Latitude : {taskObj.Latitude}</p></div>
                <div><p className="mt-1">Longitude : {taskObj.Longitude}</p></div>
                <div><p className="mt-1">Description : {taskObj.Description}</p></div>

                <div class="mx-auto">
                    <button class="btn btn-success m-2 " >Locate</button>
                    <button class="btn btn-primary m-2" onClick={() => setModal(true)} >Edit</button>
                    <button class="btn btn-danger m-2" >Delete</button>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} />
        </div >
    );
};

export default Card;