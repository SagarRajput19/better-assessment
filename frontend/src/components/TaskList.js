import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Comments({taskId}){
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  useEffect(()=>{ fetchComments() }, [taskId]);
  async function fetchComments(){
    const res = await axios.get(`/api/tasks/${taskId}/comments`);
    setComments(res.data);
  }
  async function addComment(){
    if(!text) return;
    await axios.post(`/api/tasks/${taskId}/comments`, {text});
    setText('');
    fetchComments();
  }
  async function del(id){
    await axios.delete(`/api/comments/${id}`);
    fetchComments();
  }
  return (
    <div style={{marginTop:8}}>
      <div>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add comment" />
        <button onClick={addComment}>Add</button>
      </div>
      <ul>
        {comments.map(c=> (
          <li key={c.id}>{c.text} <button onClick={()=>del(c.id)}>x</button></li>
        ))}
      </ul>
    </div>
  )
}

export default function TaskList(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(null);
  const [desc, setDesc] = useState('');

  async function fetchTasks(){
    try{
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    }catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{ fetchTasks() }, []);

  async function addTask(){
    if(!title) return;
    await axios.post('/api/tasks', {title, description: desc});
    setTitle(''); setDesc('');
    fetchTasks();
  }

  async function deleteTask(id){
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  }

  function startEdit(t){
    setEditing(t.id);
    setTitle(t.title);
    setDesc(t.description || '');
  }

  async function saveEdit(){
    await axios.put(`/api/tasks/${editing}`, {title, description: desc});
    setEditing(null);
    setTitle(''); setDesc('');
    fetchTasks();
  }

  return (
    <div>
      <div style={{marginBottom:10}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
        {editing ? <button onClick={saveEdit}>Save</button> : <button onClick={addTask}>Add</button>}
      </div>
      <ul>
        {tasks.map(t=> (
          <li key={t.id} style={{marginBottom:12}}>
            <div><strong>{t.title}</strong></div>
            <div>{t.description}</div>
            <div style={{marginTop:6}}>
              <button onClick={()=>startEdit(t)}>Edit</button> {' '}
              <button onClick={()=>deleteTask(t.id)}>Delete</button>
            </div>
            <Comments taskId={t.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
