import { firebase, app, db } from '../../db'
import { addDoc,doc, collection,updateDoc} from 'firebase/firestore';
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
    const {user,email,password,name} = req.query;
    
    let success = false;
    try {
      const salt = await bcrypt.genSalt(10)
      const passwordHashed = await bcrypt.hash(password, salt);


      const collectionDoc = collection(db, "User");

      const docRef = await addDoc(collectionDoc, {
        name: name,
        user:user,
        password:passwordHashed,
        email:email
      });
      console.log("Document written with ID: ", docRef.id);
  
      //Update
      const docUpdated = await updateDoc(doc(db, "User", docRef.id),{
        __id:docRef.id
      })

      success = true;

    } catch (error) {
      console.log(error);
    }

    res.json({ success: success });
}


/*
    //Post
  try {
    const docRef = await addDoc(collection(db, "Task"), {
      name: "Prueba 1",
      date: "25/08/2022"
    });
    console.log("Document written with ID: ", docRef.id);

    //Update
    const docUpdated = await updateDoc(doc(db, "Task", docRef.id),{
      __id:docRef.id
    })

    //Get One
    try {
    const docGetOne = await getDoc(doc(db, "Task", docRef.id))
    console.log(docGetOne.data());
    } catch (err) {
      console.log(err)
    }

    //Get One by data
    // const taskCol1 = collection(db, 'Task');
    // const queryConsultant = query(taskCol1, where('name',"==","Prueba"));
    // const taskSnapshot1 = await getDocs(queryConsultant);
    // let taskList1;
    // taskSnapshot1.forEach(doc => taskList1 = doc.data());
    // console.log(taskList1)
    // console.log(taskList1 != undefined)


    //Delete
    await deleteDoc(doc(db,"Task",docRef.id))

  } catch (e) {
    console.error("Error adding document: ", e);
  }
    //Get
  const taskCol = collection(db, 'Task');
  const taskSnapshot = await getDocs(taskCol);
  const taskList = taskSnapshot.docs.map(doc => doc.data());
  res.status(200).json(taskList)
 */