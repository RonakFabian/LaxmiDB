import React, { useEffect, useState } from 'react';
import locationEntryService from "../services/locationEntry.services";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ConfirmDelete({ isModalOpen, ToggleDeleteModal, getEntries, docID })
{
  const deleteHandler = async (id) =>
  {
    await locationEntryService.deleteLocationEntry(id);
    getEntries();
  }

  return (<>
    <Modal isOpen={isModalOpen} toggle={ToggleDeleteModal} >
      <form>
        <ModalHeader >Confirm Delete Task</ModalHeader>
        <ModalBody>

          <span>Are you sure you want to delete?</span>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(id) => deleteHandler(id)}>Delete</Button>{' '}
          <Button color="secondary" onClick={() => ToggleDeleteModal(false)} >Cancel</Button>
        </ModalFooter>
      </form>
    </Modal>
  </>)

}

export default ConfirmDelete;