import React from 'react'
import { useParams } from 'react-router-dom';

function Search() {
  const { id } = useParams();

  return (
    <div>
    <h1>Search</h1>
      <h2>You searched for: {id}</h2>
    </div>
  )
}

export default Search