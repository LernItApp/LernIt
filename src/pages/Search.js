import { React, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Search() {
  const { id } = useParams();

  useEffect(() => {
    const searchBar = document.querySelector('.searchBar');
    if (searchBar) {
      searchBar.value = id;
    }
  }, [id]);

  return (
    <div>
    <h1>Search</h1>
      <h2>You searched for: {id}</h2>
    </div>
  )
}

export default Search