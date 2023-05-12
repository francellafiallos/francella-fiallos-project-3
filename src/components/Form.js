import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    //saving the API data in state
  const [genre, setGenre] = useState("");
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [questionThree, setQuestionThree] = useState("");
  const [questionFour, setQuestionFour] = useState("");
  const [questionFive, setQuestionFive] = useState("");
 
//   const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('you clicked submit!')
    fetchData();
  }
  
  const handleRadioOneChange = (event) => {
    setQuestionOne(event.target.value);
  }

  const handleRadioTwoChange = (event) => {
    setQuestionTwo(event.target.value);
  }

  const handleRadioThreeChange = (event) => {
    setQuestionThree(event.target.value);
  }

  const handleRadioFourChange = (event) => {
    setQuestionFour(event.target.value);
  }

  const handleRadioFiveChange = (event) => {
    setQuestionFive(event.target.value);
  }
  
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

    //consider each form field and filter results based on their selected value
    const filterResult = (genres) => {

        const youthwords = ["pop", "trap", "rap"];
        const oldwords = ["folk", "jazz", "rock"];

        const spotifyWords = ["tronica", "core"];
        const appleWords = ["trip", "electro", "future"];

        const yesLinerNotesWords = ["swedish", "tropicali", "post"];
        const noLinerNotesWords = ["korean", "cowbell", "flow"];

        const wordOfMouthWords = ["banjo", "bluegrass"];
        const bandcampWords = ["goth", "gaze", "power"];

        const guitarWords = ["guitar"];
        const keyboardWords = ["keyboard", "synth", "piano"];
        
        // const age = document.querySelector('input[name="age"]:checked').value;
        // const streamingService = document.querySelector('input[name="streaming"]:checked').value;

        let newGenres = [];
        for (let i = 0; i < genres.length; i++) {
            let genre = genres[i];
        
            // If an expression is true, add the genre to newGenres. this is the conditional logic for age
            if (questionOne == "18-35" && youthwords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
            else if (questionOne == "36-49" && oldwords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }

            // streaming conditional logic

            else if (questionTwo == "spotify" && spotifyWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
            else if (questionTwo == "apple-music" && appleWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }

            // liner notes conditional logic

            else if (questionThree == "yes" && yesLinerNotesWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
            else if (questionThree == "no" && noLinerNotesWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }

            // new music conditional logic

            else if (questionFour == "word-of-mouth" && wordOfMouthWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
            else if (questionFour == "Bandcamp-and-online-research" && bandcampWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }

            // instrument conditional logic

            else if (questionFive == "guitar" && guitarWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
            else if (questionFive == "keyboard" && keyboardWords.some((word) => {
                return genre.includes(word);
            })) {
              newGenres.push(genre);
            }
          }
        
          // Remove all old genres and replace them with new genres
          genres = newGenres; // This line modifies the genres array
          return genres;

    }
    
    const pickGenre = (genres, backup) => {
        if ( genres.length == 0 )
        return backup;
        let i = Math.floor(Math.random()*genres.length);
        return genres[i];
    }

}

    return (
        <section>
            <form onSubmit={handleSubmit}>

                <div className="form-questions">

                    <legend>1. How old are you?</legend>

                    <div>

                        <input 
                            type="radio" 
                            value="18-35" 
                            id="age-one" 
                            className="form-question"
                            name="age" 
                            checked={questionOne === "18-35"}
                            onChange={handleRadioOneChange}
                            required/>
                        <label htmlFor="age-one">18-35</label>
                        <input 
                            type="radio" 
                            value="36-49" 
                            id="age-two" 
                            className="form-question"
                            name="age"
                            checked={questionOne === "36-49"}
                            onChange={handleRadioOneChange}/>
                        <label htmlFor="age-two">36-49</label>

                    </div>


                    <legend>2. Which streaming platform do you use?</legend>

                    <input 
                        type="radio" 
                        value="spotify" 
                        id="streaming-one" 
                        className="form-question"
                        name="streaming" 
                        checked={questionTwo === "spotify"}
                        onChange={handleRadioTwoChange}
                        required/>
                    <label htmlFor="streaming-one">Spotify</label>
                    <input 
                        type="radio" 
                        value="apple-music" 
                        id="streaming-two" 
                        className="form-question"
                        name="streaming"
                        checked={questionTwo === "apple-music"}
                        onChange={handleRadioTwoChange}/>
                    <label htmlFor="streaming-two">Apple Music</label>

                    <legend>3. Do you read the liner notes of an album?</legend>

                    <input 
                        type="radio" 
                        value="yes" 
                        id="liner-notes-one" 
                        className="form-question"
                        name="liner-notes" 
                        checked={questionThree === "yes"}
                        onChange={handleRadioThreeChange}
                        required/>
                    <label htmlFor="liner-notes-one">Yes</label>
                    <input 
                        type="radio" 
                        value="no" 
                        id="liner-notes-two" 
                        className="form-question"
                        name="liner-notes"
                        checked={questionThree === "no"}
                        onChange={handleRadioThreeChange}/>
                    <label htmlFor="liner-notes-two">No</label>

                    <legend>4. How do you discover new music?</legend>

                    <input 
                        type="radio" 
                        value="word-of-mouth" 
                        id="new-music-one" 
                        className="form-question"
                        name="new-music" 
                        checked={questionFour === "word-of-mouth"}
                        onChange={handleRadioFourChange}
                        required/>
                    <label htmlFor="new-music-one">Word of Mouth</label>
                    <input 
                        type="radio" 
                        value="Bandcamp-and-online-research" 
                        id="new-music-two" 
                        className="form-question"
                        name="new-music"
                        checked={questionFour === "Bandcamp-and-online-research"}
                        onChange={handleRadioFourChange}/>
                    <label htmlFor="new-music-two">Bandcamp and online research</label>

                    <legend>5. Which instrument do you prefer?</legend>

                    <input 
                        type="radio" 
                        value="guitar" 
                        id="instrument-one" 
                        className="form-question"
                        name="instrument" 
                        checked={questionFive === "guitar"}
                        onChange={handleRadioFiveChange}
                        required/>
                    <label htmlFor="instrument-one">Guitar</label>
                    <input 
                        type="radio" 
                        value="keyboard" 
                        id="instrument-two" 
                        className="form-question"
                        name="instrument"
                        checked={questionFive === "keyboard"}
                        onChange={handleRadioFiveChange}/>
                    <label htmlFor="instrument-two">Keyboard</label>
                    
                    <button>Submit</button>

                </div>
            </form>
            <h2>If you were a genre, you would be...</h2>
            {genre && <p>{genre}</p>} 
        </section>
    )
}

export default Form; 