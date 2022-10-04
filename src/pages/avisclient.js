import React, { useState, useEffect } from "react";
import Axios from "axios";
import "reactjs-popup/dist/index.css";
import "../components/assets/styles/form.css";

function AvisClient() {

    // const enqueteId = JSON.parse(window.localStorage.getItem("enqueteId"));
    const questionId = JSON.parse(window.localStorage.getItem("questionId"));
	const [question1Id, setQuestionId] = useState("");
    const [data, setQuestionList] = useState([]);
    const [reponse1, setReponse1] = useState(""); 
    const [reponse2, setReponse2] = useState("");
    const [reponse3, setReponse3] = useState("");
    const [reponse4, setReponse4] = useState("");
    const [reponse5, setReponse5] = useState("");
    const [commentaire, setCommentier] = useState("");


    const addReponse = (e) => {
        e.preventDefault();
        if (reponse1 > 5 || reponse2 > 5 || reponse3 > 5 || reponse4 > 5 || reponse5 > 5)
            alert("Les notes des reponses ne doivent pas etre surperieur a 5");
        else {
            fetch("http://localhost:3600/api/reponse", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    // enqueteId: enqueteId,
                    questionId: questionId,
                    reponse1: reponse1,
                    reponse2: reponse2,
                    reponse3: reponse3,
                    reponse4: reponse4,
                    reponse5: reponse5,
                    commentaire: commentaire,

                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        window.location.href = "../clientredirection";
                    } else {
                        alert("Echec lors de l'envoi de vos reponses");
                    }
                });
        };
    };


   
 const getQuestions = () => {
        Axios.get(`http://localhost:3600/api/search/${questionId}`)
        .then((response) => {
            setQuestionList(response.data);
        });
    };
    useEffect(() => {
        getQuestions();
    }, [])

    return (
      <div>
              <div className="container px-3 my-5 clearfix">
                <div className="card">
                    <div className="card-header">
                        <h2>Point de vue Client</h2>
                        <h6 className="text-primary text-center">
                            Noter la qualiter de notre service pour nous aider a nous ameliorer et vous satisfaire.
                        </h6>
                    </div>
                    <form onSubmit={addReponse}  >
                    <div className="form-group">
						<input
							type="hidden"
							onChange={(event) => {
								setQuestionId(event.target.value);
							}}
						/>
					</div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered m-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center py-3 px-4">Question</th>
                                            <th className="text-right py-3 px-4" >reponse</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-10">
                                                {data.question1}

                                            </td>
                                            <td className="text-right font-weight-semibold align-middle p-4">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder=".../5"
                                                    onChange={(event) => {
                                                        setReponse1(event.target.value);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-10">
                                                {data.question2}
                                            </td>
                                            <td className="text-right font-weight-semibold align-middle p-4"><input
                                                type="number"
                                                className="form-control"
                                                placeholder=".../5"
                                                onChange={(event) => {
                                                    setReponse2(event.target.value);
                                                }} /></td>
                                        </tr>
                                        <tr>
                                            <td className="p-10">
                                                {data.question3}
                                            </td>
                                            <td className="text-right font-weight-semibold align-middle p-4"><input
                                                type="number"
                                                className="form-control"
                                                placeholder=".../5"
                                                onChange={(event) => {
                                                    setReponse3(event.target.value);
                                                }} /></td>

                                        </tr>
                                        <tr>
                                            <td className="p-10">
                                                {data.question4}
                                            </td>
                                            <td className="text-right font-weight-semibold align-middle p-4"><input
                                                type="number"
                                                className="form-control"
                                                placeholder=".../5"
                                                onChange={(event) => {
                                                    setReponse4(event.target.value);
                                                }} /></td>

                                        </tr>
                                        <tr>
                                            <td className="p-10">
                                                {data.question5}
                                            </td>
                                            <td className="text-right font-weight-semibold align-middle p-4"><input
                                                type="number"
                                                className="form-control"
                                                placeholder=".../5"
                                                onChange={(event) => {
                                                    setReponse5(event.target.value);
                                                }} /></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <label className="form-label mt-5">Commentaire</label>
                                <textarea className="form-control" placeholder="votre commentaire, recommendation, avis ici..." onChange={(event) => {
                                    setCommentier(event.target.value);
                                }}>
                                </textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-lg btn-primary mt-2">Valider</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

      </div>


    );
}

export default AvisClient;
