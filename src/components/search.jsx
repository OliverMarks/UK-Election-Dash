import { useState } from 'react'
import '../App.css'




const Search = ({constituencyID, setConstituencyID}) => {
  
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])


  



  async function handleConstituencySearch(event) {
    event.preventDefault()
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const response = await fetch(`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${searchTerm}&skip=0&take=10`);
    const data = await response.json();
    const searchResults = data.items.map((item) => ({
      id: item.value.id,
      name: item.value.name,
    }));
    setSearchResults(searchResults);
  
}


  

  function handleSelectConstituency (constituency) {
    setConstituencyID({
      name: constituency.name,
      id: constituency.id
    })
    setSearchTerm(constituency.name)
    setSearchResults([])
  }


 



  return (
<div className="relative flex flex-col text-black">
  <form onSubmit={(event) => event.preventDefault()}>
    <input
      type="text"
      placeholder="Search by name or postcode"
      className="w-[258px]"
      value={searchTerm}
      onChange={(event) => handleConstituencySearch(event)}
    />
  </form>

  {searchResults && (
    <div className="absolute mt-6 border-2 w-[258px] bg-white">
      {searchResults.map((constituency) => (
        <div
          className="cursor-pointer hover:bg-gray-300"
          key={constituency.id}
          onClick={() => handleSelectConstituency(constituency)}
        >
          <span>{constituency.name}</span>
        </div>
      ))}
    </div>
  )}
</div>








    
    
  )
}

export default Search