import { useState, useEffect } from "react";

function AdminSemester(){

    const [records,setRecords] = useState([]);
    const [selectedRecord,setSelectedRecord] =
        useState(null);
        const [studentid,setStudentid] =
   useState("");

const [semester,setSemester] =
   useState("");

const [gpa,setGpa] =
   useState("");

   const [showAddForm,setShowAddForm] =
   useState(false);
const handleAdd = async()=>{

   const token =
      localStorage.getItem("token");

   await fetch(
      "http://localhost:3000/semester/addsemrecord",
      {
         method:"POST",

         headers:{
            "Content-Type":
               "application/json",

            Authorization:
               `Bearer ${token}`
         },

         body:JSON.stringify({
           studentid:Number(studentid),
   semester:Number(semester),
   gpa:Number(gpa)
         })
      }

   );
if(!studentid || !semester || !gpa){
   alert("Please fill all fields");
   return;
}
  
   await fetchSemesters();
   

setStudentid("");
setSemester("");
setGpa("");

setShowAddForm(false);
};
    const fetchSemesters = async()=>{

        const token =
            localStorage.getItem("token");

        try{

            const response =
                await fetch(
                    "http://localhost:3000/semester/getallsemrecords",
                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            setRecords(
                data.entries || []
            );

        }
        catch(error){
            console.log(error.message);
        }
    };

    useEffect(()=>{
        fetchSemesters();
    },[]);

    const handleDelete = async(id)=>{

        const token =
            localStorage.getItem("token");

        try{

            await fetch(
                `http://localhost:3000/semester/deletesemrecord/${id}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            await fetchSemesters();

        }
        catch(error){
            console.log(error.message);
        }
    };

    const handleUpdate = async()=>{

        const token =
            localStorage.getItem("token");

        try{

            await fetch(
                `http://localhost:3000/semester/updatesemrecord/${selectedRecord.id}`,
                {
                    method:"PATCH",

                    headers:{
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        semester:
                            selectedRecord.semester,

                        gpa:
                            selectedRecord.gpa,

                      
                    })
                }
            );

            await fetchSemesters();

            setSelectedRecord(null);

        }
        catch(error){
            console.log(error.message);
        }
    };

    return(
        <>
            <h2>Semester Records</h2>
           <button className="btn-green-add"
   onClick={()=>
      setShowAddForm(!showAddForm)
   }
>
   Add Semester Record(+)
</button>

{showAddForm && 
<div className="update-form"><input
   placeholder="Student ID"
   value={studentid}
   onChange={(e)=>
      setStudentid(e.target.value)
   }
/>

<input
   placeholder="Semester"
   value={semester}
   onChange={(e)=>
      setSemester(e.target.value)
   }
/>

<input
   placeholder="GPA"
   value={gpa}
   onChange={(e)=>
      setGpa(e.target.value)
   }
/>
 <button onClick={handleAdd}>
      Save Record
   </button>
</div>}

            {selectedRecord && (
                <div className="update-form">

                    <h3>
                        Update Semester Record
                    </h3>

                    <input
                        type="text"
                        value={selectedRecord.semester}
                        onChange={(e)=>
                            setSelectedRecord({
                                ...selectedRecord,
                                semester:e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        value={
                            selectedRecord.gpa
                        }
                        onChange={(e)=>
                            setSelectedRecord({
                                ...selectedRecord,
                                gpa:
                                    e.target.value
                            })
                        }
                    />

                  

                    <button
                        onClick={handleUpdate}
                    >
                        Save
                    </button>

                    <button
                        onClick={()=>
                            setSelectedRecord(null)
                        }
                    >
                        Cancel
                    </button>

                </div>
            )}

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
<th>Student ID</th>
<th>Semester</th>
<th>GPA</th>
<th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {records.map((record)=>(
                        <tr key={record.id}>

                            <td>{record.id}</td>

                            <td>
                                {record.studentid}
                            </td>

                            <td>
                                {record.semester}
                            </td>

                            <td>
                                {record.gpa}
                            </td>

                           

                            <td>

                                <button className="action-btn"
                                    onClick={()=>
                                        setSelectedRecord(
                                            record
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button className="delete-btn"
                                    onClick={()=>
                                        handleDelete(
                                            record.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>
        </>
    );
}

export default AdminSemester;