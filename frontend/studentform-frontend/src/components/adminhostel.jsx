import { useState, useEffect } from "react";

function AdminHostel(){

    const [records,setRecords] = useState([]);
    const [selectedRecord,setSelectedRecord] =
        useState(null);
        const [studentid,setStudentid] =
   useState("");

const [hostel,setHostel] = useState("");
const [roomNumber,setRoomNumber] =
   useState("");
const [dateAllocated,setDateAllocated] =
   useState("");

   const [showAddForm,setShowAddForm] =
   useState(false);
const handleAdd = async()=>{

   if(!studentid || !hostel || !roomNumber || !dateAllocated){
      alert("Please fill all fields");
      return;
   }

   const token =
      localStorage.getItem("token");

   await fetch(
      "http://localhost:3000/hostel/addhostelrecord",
      {
         method:"POST",

         headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
         },

         body:JSON.stringify({
            studentid:Number(studentid),
            hostel,
            roomNumber,
            dateAllocated
         })
      }
   );

   await fetchHostels();

   setStudentid("");
   setHostel("");
   setRoomNumber("");
   setDateAllocated("");

   setShowAddForm(false);
};
    const fetchHostels = async()=>{

        const token =
            localStorage.getItem("token");

        try{

            const response =
                await fetch(
                    "http://localhost:3000/hostel/getallhostelrecords",
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
        fetchHostels();
    },[]);

    const handleDelete = async(id)=>{

        const token =
            localStorage.getItem("token");

        try{

            await fetch(
                `http://localhost:3000/hostel/deletehostelrecord/${id}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            await fetchHostels();

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
                `http://localhost:3000/hostel/updatehostelrecord/${selectedRecord.id}`,
                {
                    method:"PATCH",

                    headers:{
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                   body: JSON.stringify({
   hostel:selectedRecord.hostel,
   roomNumber:selectedRecord.roomNumber,
   dateAllocated:selectedRecord.dateAllocated
})
                }
            );

            await fetchHostels();

            setSelectedRecord(null);

        }
        catch(error){
            console.log(error.message);
        }
    };

    return(
        <>
            <h2>Hostel Records</h2>
           <button
   onClick={()=>
      setShowAddForm(!showAddForm)
   }
>
   Add Hostel Record
</button>

{showAddForm && 
<div><input
   placeholder="Student ID"
   value={studentid}
   onChange={(e)=>setStudentid(e.target.value)}
/>

<input
   placeholder="Hostel"
   value={hostel}
   onChange={(e)=>setHostel(e.target.value)}
/>

<input
   placeholder="Room Number"
   value={roomNumber}
   onChange={(e)=>setRoomNumber(e.target.value)}
/>

<input
   type="date"
   value={dateAllocated}
   onChange={(e)=>setDateAllocated(e.target.value)}
/>

<button onClick={handleAdd}>
   Save Record
</button>
</div>}

            {selectedRecord && (
    <div>

        <h3>
            Update Hostel Record
        </h3>

        <input
            type="text"
            value={selectedRecord.hostel}
            onChange={(e)=>
                setSelectedRecord({
                    ...selectedRecord,
                    hostel:e.target.value
                })
            }
        />

        <input
            type="text"
            value={selectedRecord.roomNumber}
            onChange={(e)=>
                setSelectedRecord({
                    ...selectedRecord,
                    roomNumber:e.target.value
                })
            }
        />

        <input
            type="date"
            value={selectedRecord.dateAllocated}
            onChange={(e)=>
                setSelectedRecord({
                    ...selectedRecord,
                    dateAllocated:e.target.value
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
        <th>Hostel</th>
        <th>Room Number</th>
        <th>Date Allocated</th>
        <th>Action</th>
    </tr>
</thead>

<tbody>

    {records.map((record)=>(
        <tr key={record.id}>

            <td>{record.id}</td>

            <td>{record.studentid}</td>

            <td>{record.hostel}</td>

            <td>{record.roomNumber}</td>

          <td>
   {new Date(record.dateAllocated)
      .toLocaleDateString()}
</td>

            <td>

                <button
                    onClick={()=>
                        setSelectedRecord(record)
                    }
                >
                    Edit
                </button>

                <button
                    onClick={()=>
                        handleDelete(record.id)
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

export default AdminHostel;