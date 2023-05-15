import { useState } from 'react';
import axios from 'axios';
import formQuestions from '../helpers/questions';

const Form = () => {
    //saving the API data in state
  const [genre, setGenre] = useState("");


  const [questions, setQuestions] = useState(formQuestions);
 
//   const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }
  
console.log(questions);

  //fetching the API data
  const fetchData = () => {
      
      axios ({
          url: "https://binaryjazz.us/wp-json/genrenator/v1/genre/100",
          method: "GET",
          dataResponse: "json"
        }).then( (res) => {
            console.log(res.data);
            
       let genres = filterResult(res.data); 
        console.log(genres);   
        setGenre(pickGenre(genres, res.data[0]));
    })

    // filtering the original array of 100 based on conditional logic below. conditional logic is refactored and optimized to allow for more questions in the future!
    
    const filterResult = (genres) => {
        let newGenres = []
        // console.log(genres.includes("grave brass")
        for (let i = 0; i < genres.length; i++) {
            let genre = genres[i];
            questions.forEach((chunk) => {
                    if (chunk.response === chunk.values[0] && chunk.first.some((word) => 
                        genre.includes(word)
                    )
                    ) {
                        newGenres.push(genre);
                    } else if (
                        chunk.response === chunk.values[1] && chunk.second.some((word) => 
                        genre.includes(word) )
                    ) {
                        newGenres.push(genre);
                    }
                })
        }

        
          // Remove all old genres and replace them with new genres
          genres = newGenres; // This line modifies the genres array
          return genres;

    }
    
    const pickGenre = (genres, backup) => {
        if ( genres.length === 0 )
        return backup;
        let i = Math.floor(Math.random()*genres.length);
        return genres[i];
    }

}

    return (
        <section>
            <form onSubmit={handleSubmit}>

                <div className="form-questions">

                    {
                        questions?.map((item, index) => {
                            return (
                                <div className="questions" key={"key"+index}>

                                <div className="question-one-options">

                                <legend>{item.question}</legend>

                                    <div className="option-one-q1">

                                        <input 
                                            type="radio" 
                                            value={item.values[0]} 
                                            id={item.values[0]} 
                                            className="form-question"
                                            name={"radio" + index} 
                                            // checked={questionOne === "18-35"}
                                            onChange={(event) => setQuestions([
                                                ...questions.slice(0, index),
                                                {
                                                    ...item,
                                                    response: event.target.value
                                                },
                                                ...questions.slice(index + 1)
                                            ])}
                                            required/>
                                        <label htmlFor={item.values[0]}>{item.values[0]}</label>

                                    </div>

                                    <div className="option-two-q1">

                                        <input 
                                            type="radio" 
                                            value={item.values[1]} 
                                            id={item.values[1]}
                                            className="form-question"
                                            name={"radio" + index}
                                            // checked={questionOne === "36-49"}
                                            onChange={(event) => setQuestions([
                                                ...questions.slice(0, index),
                                                {
                                                    ...item,
                                                    response: event.target.value
                                                },
                                                ...questions.slice(index + 1)
                                            ])}
                                            />
                                        <label htmlFor={item.values[1]}>{item.values[1]}</label>

                                    </div>

                                </div>

                            </div>
                            )
                        })
                    }

                    <div className="button-container">

                        <button>tell me!</button>

                    </div>

                </div>
            </form>
            <h2>If you were a genre, you would be...</h2>
            {genre && <h3 className="grow">{genre}</h3>} 
        </section>
    )
}

export default Form; 