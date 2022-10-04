import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Logo from "../components/assets/images/logo.png"

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			tel: "",
			secteur_activité: "",
			localisation: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		const { nom, tel, secteur_activité, localisation, email, password, passwordConfirmation } = this.state;
		if (nom === "" || tel === "" || email === "" || password === "" || secteur_activité ==="" || localisation ==="")
			alert("Un champ est vide");
		else if (password !== passwordConfirmation)
			alert("Confirmer le mot de passe");
		else {
			fetch("http://localhost:3600/api/auth/signup", {
				method: "POST",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					nom,
					tel,
					secteur_activité,
					localisation,
					email,
					password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status) {
						//une fois inscrit on le login direct
						fetch("http://localhost:3600/api/auth/login", {
							method: "POST",
							crossDomain: true,
							headers: {
								"Content-Type": "application/json",
								Accept: "application/json",
								"Access-Control-Allow-Origin": "*",
							},
							body: JSON.stringify({
								email,
								password,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.status) {
									window.localStorage.setItem(
										"userId",
										JSON.stringify(data.userId)
									);window.localStorage.setItem(
										"userToken",
										JSON.stringify(data.token)
									);
									alert("Compte créer avec succès");
									window.location.href = "./pages/dashboard"
								} else {
									alert(data.message);
								}
							});
					} else {
						alert(data.message);
					}
				});
		}
	}

	render() {
		return (
			<div>
				    <nav className="navbar navbar-light bg-light mt-0 ">
  <div className="container-fluid mt-0">
    <a className="navbar-brand" href="/">
      <img src={Logo} alt="" width="65" height="55" className="d-inline-block align-text-top"/>
    </a>
        <ol className="breadcrumb d-flex">
								<li className="breadcrumb-item">
									<Link to="/login">Login</Link>
								</li>
								<li className="breadcrumb-item">
									<Link to="/signup">
										Register
									</Link>
								</li>
							</ol>
  </div>
</nav>

				<div className="container col-12  p-3">
					<h1
						className="mt-2 text-center"
						style={{ fontFamily: "Ink Free" }}
					>
						Bienvenue dans le système de gestion de votre Entreprise
					</h1>
				</div>
				<div className="container mt-1 col-lg-6">
					<form
						onSubmit={this.handleSubmit}
						className="bg-light mt-2 p-3"
						style={{ borderRadius: "20px" }}
					>
						<h4 className="text-primary text-center">
							Créer votre compte pour débuter dans Customer service
						</h4>
						<div className="row mb-3 mt-5">
							<label className="col-sm-3 col-form-label">
								Nom :
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Votre nom complet..."
									onChange={(e) =>
										this.setState({ nom: e.target.value })
									}
									required
								/>
							</div>
						</div>
						<div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Téléphone :
							</label>
							<div className="col-sm-9">
								<input
									type="number"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Votre numéro de téléphone..."
									onChange={(e) =>
										this.setState({ tel: e.target.value })
									}
									required
								/>
							</div>
						</div>
                        <div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Secteur d'activité :
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Votre secteur d'activité"
									onChange={(e) =>
										this.setState({ secteur_activité: e.target.value })
									}
									required
								/>
							</div>
						</div>
                        <div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Localisation :
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Votre localisation"
									onChange={(e) =>
										this.setState({ localisation: e.target.value })
									}
									required
								/>
							</div>
						</div>
						<div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Email :
							</label>
							<div className="col-sm-9">
								<input
									type="email"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Votre email valide..."
									onChange={(e) =>
										this.setState({ email: e.target.value })
									}
									required
								/>
							</div>
						</div>
						<div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Mot de passe :
							</label>
							<div className="col-sm-9">
								<input
									type="password"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Entrer un mot de passe..."
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>
						<div className="row mb-3">
							<label className="col-sm-3 col-form-label">
								Confirmer :
							</label>
							<div className="col-sm-9">
								<input
									type="password"
									className="form-control"
									style={{
										border: "none",
										borderRadius: "20px",
										borderBottom: "1px solid gray",
									}}
									placeholder="Confirmer le mot de passe..."
									onChange={(e) =>
										this.setState({
											passwordConfirmation:
												e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className="d-flex justify-content-center col-12 my-3">
							<button
								type="submit"
								className="btn btn-primary px-4"
							>
								Sign Up
							</button>
						</div>
						<p className="forgot-password text-center">
							Vous avez déja un compte ?{" "}
							<Link to="/">Login</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}
