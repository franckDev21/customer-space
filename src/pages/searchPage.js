import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import "../components/assets/styles/form.css";
import Logo from "../components/assets/images/logo.png"

function Form() {

    const [userName, setUserName] = useState("");
    const [result, setResult] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName === "") alert("Le champ est vide");
        else {
            fetch("http://localhost:3600/api/search", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorisation: userName,
                },
                body: JSON.stringify({
                    userName,
                }),
            })
                .then((res) =>res.json())
                .then((dat) => {
                    if(dat){
                        window.localStorage.setItem(
                            "questionId",
                            JSON.stringify(dat._id)
                        );
                        setResult(dat)
                        window.location.href="avisclient/" + encodeURIComponent(userName);
                        // window.location.href="avisclient/";
                    } else{
                        alert("L'utilisateur n'exixtes pas");
                    }
                    });
        }
    }


    return (
        <div className="mt-0">
            <nav className="navbar navbar-light bg-light mt-0 ">
                <div className="container-fluid mt-0">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} alt="logo" width="70" height="65" className="d-inline-block align-text-top" />
                    </a>
                </div>
            </nav>

            <div className="container mt-3 col-lg-5">
                <form
                    onSubmit={handleSubmit}
                    className="bg-light mt-2 p-3"
                    style={{ borderRadius: "20px", padding: "50px !important", }}
                >
                    <h4 className="text-primary text-center mb-4">
                        Rechercher un Restaurant
                    </h4>

                    <div className="mb-4 row">
                        <label className="col-sm-4 col-form-label">
                            Nom du restaurant :
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                required
                                className="form-control"
                                style={{
                                    borderRadius: "20px",
                                    border: "none",
                                    borderBottom: "1px solid gray",
                                }}
                                placeholder="Entrer le nom de l'enquete.."
                                onChange={(e) =>
                                    setUserName(
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center col-12 my-3">
                        <button
                            type="submit"
                            className="btn btn-primary px-4"
                        >
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default Form;
