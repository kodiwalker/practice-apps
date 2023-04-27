import {useState} from 'react';

export default function Search ({setFilter}) {
  const [text, setText] = useState('');

  function handleSearch(e) {
    e.preventDefault();

    setFilter(text);
  }

  return (
    <form onSubmit={handleSearch}>
      <input type="text" name="filter" value={text} placeholder="Search" onChange={e => setText(e.target.value)} />
      <button type="submit">Go</button>
    </form>
  )
}