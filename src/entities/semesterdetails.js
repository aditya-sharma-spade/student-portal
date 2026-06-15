import {EntitySchema} from 'typeorm'
const semesterdetails= new EntitySchema({
name:"semesterdetails",
tableName:"semesterdetails",
columns:{
      id:{
            primary:true,
            type:"int",
            generated:true
        },

        studentid:{
            type:"int"
        },

        semester:{
            type:"int"
        },

        gpa:{
            type:"float"
        }
},
relations:{
    student:{
        type:"many-to-one",
        target:"Student",
        joinColumn:{ name:"studentid" },
        onDelete:"CASCADE"
    }
}
})
export default semesterdetails;