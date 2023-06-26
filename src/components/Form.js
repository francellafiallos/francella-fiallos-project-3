import { useState } from 'react';
import axios from 'axios';
import formQuestions from '../helpers/questions';

const Form = () => {
    //saving the API data in state
  const [genre, setGenre] = useState("");

  const [questions, setQuestions] = useState(formQuestions);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  //fetching the API data
  const fetchData = () => {
      
      axios ({
          url: "https://binaryjazz.us/wp-json/genrenator/v1/genre/100",
          method: "GET",
          dataResponse: "json"
        }).then( (res) => {
            
       let genres = filterResult(res.data);  
        setGenre(pickGenre(genres, res.data[0]));
    })

    // filtering the original array of 100 based on conditional logic below. conditional logic is refactored and optimized to allow for more questions in the future!
    
    const filterResult = (genres) => {
        let newGenres = []
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

    // this is the backup in case the user selects inputs that lead to 0 genres in a new array. what will happen is that we'll go back to the original array of 100 and randomely pick a genre for the user.
    
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

                                <legend>{item.question}</legend>

                                <div className="question-options">

                                    <div className="option-one">

                                        <input 
                                            type="radio" 
                                            value={item.values[0]} 
                                            id={item.values[0]} 
                                            className="form-question"
                                            name={"radio" + index} 
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

                                    <div className="option-two">

                                        <input 
                                            type="radio" 
                                            value={item.values[1]} 
                                            id={item.values[1]}
                                            className="form-question"
                                            name={"radio" + index}
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

                        <button type="submit">tell me!</button>
                        <button type="reset">reset</button>

                    </div>

                </div>
            </form>
            <h2>if you were a genre, you would be...</h2>
            {genre && <h3 className="grow">{genre}</h3>} 
            {genre && <h4>not happy with your genre? keep clicking the button for more options based on your answers!</h4>}
        </section>
    )
}

export default Form; 

// big thank you to dev friends stuart thiel and sam heaton for helping me! a special thank you goes out to my mentor, chris kim. and a MASSIVE thank you to koki vasileski for helping me refactor / optimize this code! he helped me reach a stretch goal that i didn't think i would reach in time! 