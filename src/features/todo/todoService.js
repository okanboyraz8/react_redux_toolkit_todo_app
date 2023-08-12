import { db } from "../../firebase/config";
import { collection, addDoc, getDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'


const createTodo = async (todoData, user) => {

    const colRef = await collection(db, 'todos');

    const docRef = await addDoc(colRef, { ...todoData, uid: user.uid })
    //console.log(docRef);

    const docSnap = await getDoc(docRef)

    return { ...docSnap.data(), id: docSnap.id };
}

const getTodos = async (user) => {

    const colRef = await collection(db, 'todos');

    const q = query(colRef, where("uid", "==", user.uid))

    const querySnapshot = await getDocs(q);

    let array = [];

    querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id })
    });

    return array;
}

const deleteTodo = async (id) => {

    const docRef = await doc(db, 'todos', id);

    await deleteDoc(docRef);

    return id
}

const todoService = {
    createTodo,
    getTodos,
    deleteTodo
}

export default todoService