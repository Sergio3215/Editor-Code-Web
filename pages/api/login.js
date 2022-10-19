import { firebase, app, db } from '../../db'
import { getDocs, where, doc, collection, query } from 'firebase/firestore';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

const createToken = (userToken, secretWord, expiresIn) => {
    // console.log(userToken);
    const { __id, email, password, name, user } = userToken;
    return jwt.sign({ __id, email, name, password, user }, secretWord, { expiresIn });
}

export default async function handler(req, res) {
    const { user, password } = req.query;

    try {
        const UserCol = collection(db, 'User');
        const queryConsultant = query(UserCol, where('user', "==", user));
        const UserSnapshot = await getDocs(queryConsultant);

        let dataUser = []
        UserSnapshot.forEach(doc => dataUser = doc.data());

        const comparePass = await bcrypt.compare(password, dataUser.password);

        if (comparePass) {
            const token = createToken(dataUser, process.env.palabraSecreta, '48h');


            res.status(200).setHeader('Set-Cookie', cookie.serialize('Token', token, {
                httpOnly: true,
                secure: process.env.MODE == 'prod',
                maxAge: 60 * 60 * 1000,
                sameSite: 'strict',
                path: '/'
            })).json({ token: token, success:true });
        }
        else{
            throw new Error("La contraseña es incorrecta");
        }

    } catch (err) {
        console.log(err)
        res.json({ data: [], error: err.message, success:false  });
    }
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