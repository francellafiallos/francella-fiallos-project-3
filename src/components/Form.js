import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    //saving the API data in state
  const [genre, setGenre] = useState("");
//   const [error, setError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('you clicked submit!')
    fetchData();
  }
  
  //fetching the API data
  const fetchData = () => {

      axios ({
        url: "https://binaryjazz.us/wp-json/genrenator/v1/genre/",
        method: "GET",
        dataResponse: "json"
      }).then( (res) => {
        console.log(res.data);
        setGenre(res.data);
      })

  }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="radio" value="18-35" id="age-one" name="age" required/>
                <label htmlFor="age-one">How old are you?</label>
                <input type="radio" value="36-49" id="age-two" name="age"/>
                <label htmlFor="age-two">How old are you?</label>
                <button>Submit</button>
            </form>
            <h2>If you were a genre, you would be...</h2>
            {genre && <p>{genre}</p>} 
        </section>
    )
}

export default Form; 