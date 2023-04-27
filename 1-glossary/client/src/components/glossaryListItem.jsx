import axios from "axios";
import {useState} from 'react';

export default function GlossaryListItem ({word, words, setWords}) {
  const [editClicked, setEditClicked] = useState(false);
  const [wordText, setWordText] = useState(word.word);
  const [defText, setDefText] = useState(word.definition);

  function handleDelete () {
    axios.delete(`/api/${word._id}`)
      .then((response) => {
        setWords(
          words.filter(w => w._id !== word._id)
        )
      })
      .catch((error) => {
        console.error('Delete failed:', error)
      })
  }

  function handleEdit () {
    setEditClicked(true);
  }

  function handleConfirm () {
    if (wordText === word.word  && defText === word.definition) {
      alert('Edit a field or click Cancel')
    } else {
    const edited = {_id: word._id, word: wordText, definition: defText};
    axios.patch('/api', edited)
      .then((response) => {
        setWords(words.map(w => {
          if (w._id === edited._id) {
            return edited;
          } else {
            return w;
          }
        }))
        setEditClicked(false);
      })
      .catch((error) => {
        console.error('Failed to edit:', error)
      })
    }
  }

  if (editClicked) {
    return (
    <li>
      <input type="text" value={wordText} onChange={e => setWordText(e.target.value)} />
      <input type="text" value={defText} onChange={e => setDefText(e.target.value)} />
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={() => setEditClicked(false)}>Cancel</button>
    </li>
    )
  } else {
    return (
    <li>
      <span>{word.word}: </span>
      <span>{word.definition}</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
    )
  }

}