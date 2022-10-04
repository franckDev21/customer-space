// import React, { Component, useState } from "react";
// import { Link } from "react-router-dom";
// import face28 from "../components/assets/images/faces/face28.jpg";
// import LocalStorage from "localStorage";
// import Axios from "axios";

// export default class EditProfil extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			profil: {},
// 			userId: "",
// 			nom: "",
// 			tel: "",
// 			email: "",
// 		};
// 	}

// 	componentDidMount() {
// 		this.getProfilUser();
// 	}

// 	//recuperer les infos du profil de l'utilisateur
// 	getProfilUser() {
// 		this.setState({
// 			profil: JSON.parse(window.localStorage.getItem("profil")),
// 			userId: JSON.parse(window.localStorage.getItem("userId")),
// 		});
// 	}

// 	//update le profil
// 	setUpdateUser() {
// 		let { profil, userId, nom, tel, email } = this.state;

// 		if (!email && !nom && !tel) alert("Aucune donnée à modifier");
// 		else {
// 			if (!nom) nom = profil.nom;
// 			if (!tel) tel = profil.tel;
// 			if (!email) email = profil.email;
// 			Axios.put(`/api/auth/update/${userId}`, {
// 				nom: nom,
// 				tel: tel,
// 				email: email,
// 			})
// 				.then((response) => {
// 					if (response.status === 201) {
// 						alert(response.data.message);
// 						window.location.href = "../";
// 					}
// 				})
// 				.catch((error) => {
// 					alert(error.response.data.message);
// 				});
// 		}
// 	}

// 	render() {
// 		const { profil } = this.state;

// 		return (
// 			<div className="profil">

// 				<div className="container">
// 					<div className="main-body">
// 		<nav
// 							aria-label="breadcrumb"
// 							className="main-breadcrumb"
// 						>
// 							<ol className="breadcrumb mt-5">
// 								<li className="breadcrumb-item">
// 									<Link to="/">Acceuil</Link>
// 								</li>
// 								<li className="breadcrumb-item">
// 									<Link to="/pages/dashboard">
// 										Espace utilisateur
// 									</Link>
// 								</li>
// 								<li className="breadcrumb-item">
// 									<Link to="/pages/dashboard/userprofil">
// 										Profil utilisateur
// 									</Link>
// 								</li>
// 								<li className="breadcrumb-item">
// 									<Link to="/pages/dashboard/userprofil/update">
// 										Modifier le profil
// 									</Link>
// 								</li>
// 							</ol>
// 						</nav>

// 						<div className="container1 rounded bg-white  mb-5">
// 							<div className="row">
// 								<div className="col-md-3 border-right">
// 									<div className="d-flex flex-column align-items-center text-center p-3 py-5">
// 										<img
// 											className="rounded-circle mt-5"
// 											width="150px"
// 											src={face28}
// 										/>
// 										<span className="font-weight-bold">
// 											{profil.nom}
// 										</span>
// 										<span className="text-black-50">
// 											{profil.email}
// 										</span>
// 									</div>
// 								</div>
// 								<div className="col-md-5 border-right">
// 									<div className="p-3 py-5">
// 										<div className="d-flex justify-content-center align-items-center mb-3">
// 											<h4 className="text-center text-success text-decoration-underline">
// 												Modifier les infos du profil
// 											</h4>
// 										</div>

// 										<div className="row mt-3">
// 											<div className="col-md-12">
// 												<label className="labels">
// 													Nom complet :
// 												</label>
// 												<input
// 													type="text"
// 													className="form-control"
// 													placeholder={profil.nom}
// 													onChange={(event) => {
// 														this.setState({
// 															nom: event.target
// 																.value,
// 														});
// 													}}
// 												/>
// 											</div>
// 											<div className="col-md-12 mt-3">
// 												<label className="labels">
// 													Téléphone :
// 												</label>
// 												<input
// 													type="text"
// 													className="form-control"
// 													placeholder={profil.tel}
// 													onChange={(event) => {
// 														this.setState({
// 															tel: event.target
// 																.value,
// 														});
// 													}}
// 												/>
// 											</div>

// 											<div className="col-md-12 mt-3">
// 												<label className="labels">
// 													Email :
// 												</label>
// 												<input
// 													type="text"
// 													className="form-control"
// 													placeholder={profil.email}
// 													onChange={(event) => {
// 														this.setState({
// 															email: event.target
// 																.value,
// 														});
// 													}}
// 												/>
// 											</div>

// 											<div className="mt-5 text-center">
// 												<button
// 													className="btn btn-outline-success profile-button"
// 													type="button"
// 													onClick={() => {
// 														this.setUpdateUser();
// 													}}
// 												>
// 													Sauvegarder
// 												</button>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
