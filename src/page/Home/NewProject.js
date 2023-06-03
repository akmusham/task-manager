import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {db} from '../../Config/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function NewProject({ setPrjtName, setDescription, setDueDate, projectname, dueDate, status, Description, handleChange }) {
    


    return(
        <div>
            <input style={{margin: "10px"}} type="text" onChange={(e)=>setPrjtName(e.target.value)} placeholder="Enter Project" value={projectname} name="projectname" />
            <DatePicker style={{margin: "10px !important"}} selected={dueDate} onChange={(date) => setDueDate(date)} />
            <select style={{margin: "10px"}} value={status} onChange={handleChange}>
                <option value="select">Select</option>
                <option value="None">None</option>
                <option value="WIP">WIP</option>
                <option value="Done">Done</option>
            </select>
            <textarea style={{display: "block",margin: "10px"}} value={Description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
    )
}