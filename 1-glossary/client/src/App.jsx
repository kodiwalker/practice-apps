import Add from './components/add.jsx';
import Search from './components/search.jsx';
import GlossaryList from './components/glossaryList.jsx';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState('')

  //^ GET at initial render
  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.error('Client - Unable to get items from DB:', error)
      })
    }, []);
    
  return (
    <>
    <h1>Yictionary</h1>
    <Add words={words} setWords={setWords} />
    <Search words={words} setFilter={setFilter} />
    <GlossaryList words={words} setWords={setWords} filter={filter} />
    </>
  )
}