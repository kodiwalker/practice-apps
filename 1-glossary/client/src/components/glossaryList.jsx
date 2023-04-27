import GlossaryListItem from './glossaryListItem.jsx';

export default function GlossaryList ({words, setWords, filter}) {

  if (filter) {
    words = words.filter(word => word.word.toLowerCase().includes(filter.toLowerCase()) || word.definition.toLowerCase().includes(filter.toLowerCase()))
  }
  return (
    <div>
      <h3>Glossary ({words.length})</h3>
      <ul>
        {words.length !== 0 ? words.map(word => (<GlossaryListItem word={word} words={words} key={word._id} setWords={setWords} />)) : 'No Matches'}
      </ul>
    </div>
  )
}