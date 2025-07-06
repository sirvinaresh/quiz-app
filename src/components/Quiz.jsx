import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { data } from "../components/Quetions";
import Form from "react-bootstrap/Form";
import ProgressBar from 'react-bootstrap/ProgressBar';
function Quiz() {
  const [record, setrecoard] = useState(data);
  const [index, setindex] = useState(0);
  const [currect, setcurrent] = useState("");
  const [score, setscore] = useState(0);
  const [result, setresult] = useState(false);

  //next
  const handlenext = () => {
    if (index < record.length - 1) {
      setindex(index + 1);
      setcurrent("");
    } else {
      setresult(true);
    }
  };

  //previous
  const handlpre = () => {
   if(index > 0){
    setindex(index-1)
   }
  };

  //currect ans check
  const handlecheck = (event) => {
    let checkval = event.target.value;
    setcurrent(checkval);
    if (checkval === record[index].correctAnswer) {
      setscore(score + 1);
    }
  };

  //reset quiz
  const startagain = () =>{
    setresult(false);
    setscore(0)
    setindex(0)
  }

  //score message
  const getMessage = (score) => {
  switch (score) {
    case 1: return "Let’s build from here!";
    case 2: return "Keep grinding!";
    case 3: return "Warming up!";
    case 4: return "Almost halfway!";
    case 5: return "You can do better!";
    case 6: return "Not bad!";
    case 7: return "Well done!";
    case 8: return "Great job!";
    case 9: return "So close!";
    case 10: return "Perfect score! 🎉";
    default: return "Nice try!";
  }
  };
  
  return (
    <>
      <Container className="box shadow">
        {result ? (
          <div className="text-center ">
            <h1>
              Your Score <br /> <br />
              <p>"{getMessage(score)}"</p>
              {score} / {record.length}
            </h1>
            <button type="button" className="btn btn1 px-4 mt-3" onClick={startagain}>Start Again</button>
          </div>
        ) : (
          <div>
            <p className="  text-center pb-2 fst-italic">
              {index+1} of {record.length} Quetions
             <ProgressBar  now={(index+1)/record.length*100} 
                label={`${(index+1)/record.length*100}%`}
                striped
                animated/>  
            </p>
            <h4>
              {`Q${record[index].id}) ${record[index].question}`}
            </h4>
            {record[index].options.map((val, i) => {
              return (
                <h5 className="d-flex gap-3 ms-2 py-2">
                  <Form.Check
                    type="radio"
                    aria-label="radio 1"
                    name="radio"
                    checked={currect === val}
                    value={val}
                    onChange={handlecheck}
                  />
                  {val}
                </h5>
              );
            })}
            <div className="w-100  justify-content-between  d-flex mt-4">
              <button type="button" className="btn btn1 px-4" onClick={handlpre}> Previous </button>
              <button type="button" className="btn btn1 px-4" onClick={handlenext}> Next </button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default Quiz;
