import { useState, useEffect } from "react";

function Semesterdetails(){
const [data,setdata] = useState(null);
const fetchsemesterdetails = async()=>{
const token =localStorage.getItem("token");

const response = await fetch(
                "http://localhost:3000/semester/mysemester",
                {
                    method:"GET",
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const result =
            await response.json();

        setdata(result.entries || []);
    };

    useEffect(()=>{
        fetchsemesterdetails();
    },[]);
if(!data){
    return <p> Loading...</p>
}
    if(data.length === 0){
        return <p>No semester records found</p>;
    }
   

    return (
    <>
        <h2>Semester Details</h2>

        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Semester</th>
                    <th>GPA</th>
                </tr>
            </thead>

            <tbody>
                {data.map((semrecord) => (
                    <tr key={semrecord.id}>
                        <td>{semrecord.studentid}</td>
                        <td>{semrecord.semester}</td>
                        <td>{semrecord.gpa}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);
}

export default Semesterdetails;