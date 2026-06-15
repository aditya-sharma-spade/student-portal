import {EntitySchema} from 'typeorm'
const hosteldetails= new EntitySchema({
   name:"hosteldetails",
   tableName:"hosteldetails",
   columns:{
    id:{
          primary:true,
            type:"int",
            generated:true     
    },
    studentid:{
        type:"int"
    },
    hostel:{
            type:"varchar"
        },

        roomNumber:{
            type:"varchar"
        },

        dateAllocated:{
            type:"date"
        }
   },
   relations:{
    student:{
        type:"one-to-one",
        target:"Student",
        joinColumn:{ name:"studentid" },
        onDelete:"CASCADE"
    }
}
}
)

export default hosteldetails;