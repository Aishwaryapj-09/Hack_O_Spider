import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Quiz(){
  const [q, setQ] = useState(null);
  const [ans, setAns] = useState(null);
  const [res, setRes] = useState(null);

  useEffect(()=> {
    api.get("/quiz/random").then(setQ).catch(()=>{});
  },[]);

  if(!q) return <div style={{padding:20}}>Loading quiz...</div>

  function submit(){
    api.post("/quiz/answer", { id: q._id, answer: ans }).then(r => setRes(r)).catch(()=>setRes({correct:false}));
  }

  return (
    <div style={{padding:20}}>
      <h3>Eco Quiz</h3>
      <p>{q.question}</p>
      <div>
        {q.options.map(o => (
          <div key={o} style={{marginTop:8}}>
            <label>
              <input type="radio" name="opt" value={o} onChange={()=>setAns(o)} /> {o}
            </label>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <button className="btn" onClick={submit}>Submit</button>
      </div>
      {res && <div style={{marginTop:10}}>{res.correct ? `Correct! +${res.points || 0} pts` : 'Wrong answer'}</div>}
    </div>
  );
}
