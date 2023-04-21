import { db } from "../FirebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const locationEntryCollectionRef = collection(db, "laxmi-db");
class LocationEntryDataService
{

  addLocationEntry = (newLocationEntry) =>
  {
    return addDoc(locationEntryCollectionRef, newLocationEntry);
  }

  updateLocationEntry = (id, updatedLocationEntry) =>
  {
    const locDoc = doc(db, "laxmi-db", id)
    return updateDoc(locDoc, updatedLocationEntry);
  }
  deleteLocationEntry = (id) =>
  {
    const locDoc = doc(db, "laxmi-db", id);
    return deleteDoc(locDoc);

  }
  getAllLocationEntries = () =>
  {
    return getDocs(locationEntryCollectionRef);

  }

  getLocationEntry = (id) =>
  {

  }
}
export default new LocationEntryDataService();