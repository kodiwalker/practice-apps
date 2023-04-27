import axios from "axios"
import {useState} from 'react';

export default function Add ({words, setWords}) {
const [wordText, setWordText] = useState('');
const [defText, setDefText] = useState('');

  function handleAdd(e) {
    e.preventDefault();

    const newItem = {word: wordText, definition: defText};

    setWordText('');
    setDefText('');

    axios.post('/api', newItem)
      .then((response) => {
        newItem['_id'] = response.data;
        setWords([...words, newItem]);
      })
      .catch((error) => {
        console.error('Add - Unable to add to DB:', error)
      })
  };

  return (
    <form onSubmit={handleAdd}>
      <h3>Add New Word</h3>
      <input type="text" name="word" required placeholder="Word" onChange={e => setWordText(e.target.value)} value={wordText}/>

      <input type="text" name="definition" required placeholder="Definition" onChange={e => setDefText(e.target.value)} value={defText}/>
      <button type="submit">Add</button>
    </form>
  )
}