import React, { useState, useEffect } from "react";
import "../components/assets/styles/profil.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import face17 from "../components/assets/images/faces/face17.jpg";
import Axios from "axios";


const Profil = () => {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
	const[profil, setProfil] = useState([]);
	const currentPassword = useState([]);
	const newPassword = useState([]);
	const confirmNewPassword = useState([]);


	const getProfilUser = () =>{
		Axios.get(`http://localhost:3600/api/auth/show/${userId}`)
			.then((response) => {
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])

 const 	updatePassword = () => {
		if (!currentPassword || !newPassword || !confirmNewPassword)
			alert("Un champ est vide");
		else if (newPassword !== confirmNewPassword)
			alert("Confirmer le nouveau mot de passe");
		else {
			Axios.put(`/api/auth/update_password/${userId}`, {
				currentPassword: currentPassword,
				newPassword: newPassword,
			})
				.then((response) => {
					if (response.status === 201) {
						alert(response.data.message);
						window.location.href = "./";
					}
				})
				.catch((error) => {
					alert(error.response.data.message);
				});
		}
	}
	return (
			<div className="profil">
				

				<div className="container">
					<div className="main-body">
						<nav
							aria-label="breadcrumb"
							className="main-breadcrumb"
						>
							<ol className="breadcrumb mt-2">
								<li className="breadcrumb-item">
									<Link to="/">Acceuil</Link>
								</li>
								<li className="breadcrumb-item">
									<Link to="/pages/dashboard">
										Espace utilisateur
									</Link>
								</li>
								<li className="breadcrumb-item">
									<Link to="/pages/dashboard/userprofil">
										Profil utilisateur
									</Link>
								</li>
							</ol>
						</nav>

						<div className="row gutters-sm">
							<div className="col-md-4 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											<img
												src={face17}
												alt="Admin"
												className="rounded-circle"
												width="150"
											/>
											<div className="mt-3">
												<h4 className="mt-3">
													{profil.nom}
												</h4>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-8">
								<div className="card mb-3">
									<div className="card-body">
										<h3 className="text-primary mb-4">
										Account Details
										</h3>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">
													Nom complet :
												</h6>
											</div>
											<div className="col-sm-9 text-primary">
												{profil.nom}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">
													Email :
												</h6>
											</div>
											<div className="col-sm-9 text-primary">
												{profil.email}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">
													Téléphone :
												</h6>
											</div>
											<div className="col-sm-9 text-primary">
												{profil.tel}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">
													Secteur d'activité :
												</h6>
											</div>
											<div className="col-sm-9 text-primary">
												{profil.secteur_activité}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">
													localisation :
												</h6>
											</div>
											<div className="col-sm-9 text-primary">
												{profil.localisation}
											</div>
										</div>
										<hr />
										{/* <div className="row">
											<div className="col-sm-12">
												<Link
													className="btn btn-outline-primary float-right"
													to="/pages/dashboard/userprofil/update"
												>
													Modifier
												</Link>
											</div>
										</div> */}
									</div>
								</div>

								<div className="">
									<div className="card mb-3">
										<div className="card-body">
											<h4 className="text-info float-left">
												Modifier mon mot de passe
											</h4>
											<div
												className="bg-light mt-4 p-3"
												style={{ borderRadius: "20px" }}
											>
												<div className="row mb-3">
													<div className="col-sm-12">
														<input
															required
															type="password"
															className="form-control"
															style={{
																borderRadius:
																	"20px",
																border: "none",
																borderBottom:
																	"1px solid gray",
															}}
															placeholder="Mot de passe actuel..."
															onChange={(e) =>
																this.setState({
																	currentPassword:
																		e.target
																			.value,
																})
															}
														/>
													</div>
												</div>

												<div className="row mb-3">
													<div className="col-sm-12">
														<input
															required
															type="password"
															className="form-control"
															style={{
																borderRadius:
																	"20px",
																border: "none",
																borderBottom:
																	"1px solid gray",
															}}
															placeholder="Nouveau mot de passe..."
															onChange={(e) =>
																this.setState({
																	newPassword:
																		e.target
																			.value,
																})
															}
														/>
													</div>
												</div>

												<div className="row mb-3">
													<div className="col-sm-12">
														<input
															required
															type="password"
															className="form-control"
															style={{
																borderRadius:
																	"20px",
																border: "none",
																borderBottom:
																	"1px solid gray",
															}}
															placeholder="Confirmez le nouveau mot de passe..."
															onChange={(e) =>
																this.setState({
																	confirmNewPassword:
																		e.target
																			.value,
																})
															}
														/>
													</div>
												</div>

												<div className="d-flex justify-content-end col-12">
													<button
														type="submit"
														className="btn btn-outline-info"
														onClick={() => {
															this.updatePassword();
														}}
													>
														Mettre à jour
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default Profil;