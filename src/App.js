import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App =() => {

  const APP_ID ="87ea9972";
  const APP_KEY = "b5185cdc79af3b0e68168a01d77023ad";


  const [recipes,setRecipes] = useState([]);
  const [search,setSearch]=useState('');
  const [query, setQuery]=useState('chicken');


useEffect(() =>{

  getRecipes();

},[query]);


const getRecipes = async()=>{
const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
const data = await response.json();
setRecipes(data.hits);
console.log(data.hits);
};

const updateSearch = e =>{

  setSearch(e.target.value);

};

const getSearch = e =>{
e.preventDefault();
setQuery(search);
setSearch('');
};

  return(
    <div className="App">
    <form onSubmit={getSearch} className="searchform">
      <input 
      className="searchbar" 
      type="text"
       placeholder="search your favourite food"
       value={search}
       onChange={updateSearch}
       
       />
      <button className="searchbutton" type="submit"> Search
      </button>
    </form>
<div className="recipes">

{recipes.map( recipe =>(
      
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image} 
      ingredients={recipe.recipe.ingredients}
      
      />

    )
  )};
</div>
    
    </div>

  );
}

export default App;
