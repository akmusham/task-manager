import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import NewProject  from "./NewProject";
import { Modal, Button, Form } from "react-bootstrap";
import {db} from '../../Config/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./navbar"

function Home () {
    const [show, setShow] = useState(false);
    const [Tasks,setTasks] = useState([])
    const [toDo,SetToDo] = useState("")
    const [toDoList,SetToDos] = useState([])
    const [projectname, setPrjtName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [status, setStatus] = useState('');
    const [Description, setDescription] = useState('');
    
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
     };

    function closeModal() {
        setShow(false);
    }

    const fetchData = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tasks"));
            let tasks = [...Tasks]
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    tasks.push(doc.data())
                  });
                setTasks(tasks)
              } else {
                console.log("No such document!");
              }
        } catch (error) {
            console.log(error);
        }
    }

    let navigate = useNavigate();

    useEffect(()=>{
        fetchData()
    },[])

    // useEffect(() => {
    //     let authToken = sessionStorage.getItem('Auth Token')
    //     if (authToken) {
    //         navigate('/')
    //     }

    //     if (!authToken) {
    //         navigate('/login')
    //     }
    // }, [])

    const createProject = async() => {
        try {
            let data = {Name: projectname,dueDate: dueDate,status:status, description: Description}
            const tasksRef = collection(db, 'Tasks');
            const docRef = await addDoc(tasksRef, data);
            console.log(docRef);
            setTasks([])
            fetchData()
            if (docRef) {
                alert("Task added")
            } 
        } catch (error) {
            console.log(error,"err");
        }
    }

    
    console.log(Tasks);

    return(
        <div>
            <Navbar />
            {
                Tasks ?
                <div>
                    <div className='overview-container'>
                        <div className='tile-container'>
                            <h5>Over Due Tasks</h5>
                            <div className='count-circle'>
                                <p>2</p>
                            </div>
                        </div>
                        <div className='tile-container'>
                            <h5>Tasks Due Today</h5>
                            <div className='count-circle'>
                                <p>2</p>
                            </div>
                        </div>
                        <div className='tile-container'>
                            <h5>Tasks Due This Week</h5>
                            <div className='count-circle'>
                                <p>2</p>
                            </div>
                        </div>
                        <div className='tile-container'>
                            <h5>Tasks Completed</h5>
                            <div className='count-circle'>
                                <p>2</p>
                            </div>
                    </div>
                </div>
                {/* <div className='todo-wrapper'>
                    <input className='input-field' placeholder='Enter To-Do' name="toDo" value={toDo} onChange={(e)=>SetToDo(e.target.value)} />
                    <button className='add-button' onClick={()=>{SetToDos([...toDoList,toDo]);SetToDo("");}}>ADD</button>
                </div> */}
                <div className='table-container'>
                    <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Project</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <> 
                                    <NewProject
                                    createProject={createProject} 
                                    setPrjtName={setPrjtName}
                                    setDueDate={setDueDate}
                                    setDescription={setDescription}
                                    handleChange={handleChange}
                                    projectname={projectname}
                                    dueDate={dueDate}
                                    status={status}
                                    Description={Description}
                                    />
                                </>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>createProject()} variant="secondary">CREATE</Button>
                        </Modal.Footer>
                    </Modal>
                    <table className="todo-table">
                        <tbody>
                            <tr>
                                <th>Task Name</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th><button className="plus-button" onClick={()=> setShow(true)}>+</button></th>
                            </tr>
                        {
                            Tasks.map((each,index)=>{
                                let date = new Date(each.dueDate.seconds * 1000 + each.dueDate.nanoseconds/1000)
                                return(
                                <tr key={index}>
                                    <td>
                                    {each.Name}
                                    </td>
                                    <td>
                                    { date.toDateString()}
                                    </td>
                                    <td>
                                    {each.status}
                                    </td>
                                    <td>
                                    {each.description}
                                    </td>
                                    <td></td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                </div>

                : null
            }
      </div>
    );
}

export default Home