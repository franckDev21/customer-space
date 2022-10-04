import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Logo from "../components/assets/images/logo.png"



export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//s'il est deja connecté on le renvoie direct au dashboard
		if (JSON.parse(window.sessionStorage.getItem("userToken"))) {
			window.location.href = "pages/dashboard";
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		if (email === "" || password === "") alert("Un champ est vide");
		else {
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
				.then(async (data) => {
					if (data.status) {
						window.localStorage.setItem(
							"userId",
							JSON.stringify(data.userId)
						);
						window.localStorage.setItem(
							"userToken",
							JSON.stringify(data.token)
						);
						alert("Connexion réussie");
						window.location.href = "./pages/dashboard"
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
				<div className="container col-12 mt-2 p-4">
					<h1
						className="mt-2 text-center"
						style={{ fontFamily: "Ink Free" }}
					>
						Bienvenue dans Customer Service
					</h1>
				</div>
				<div className="container mt-3 col-lg-5">
					<form
						onSubmit={this.handleSubmit}
						className="bg-light mt-2 p-3"
						style={{ borderRadius: "20px", padding: "50px !important", }}
					>
						<h4 className="text-primary text-center">
							Connectez vous à votre compte 
						</h4>

						<div className="row mb-3 mt-5">
							<label className="col-sm-3 col-form-label">
								Email :
							</label>
							<div className="col-sm-9">
								<input
									type="email"
									className="form-control"
									style={{
										borderRadius: "20px",
										border: "none",
										borderBottom: "1px solid gray",
									}}
									placeholder="Entrer votre email..."
									onChange={(e) =>
										this.setState({
											email: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className="mb-4 row">
							<label className="col-sm-3 col-form-label">
								Mot de passe :
							</label>
							<div className="col-sm-9">
								<input
									type="password"
									className="form-control"
									style={{
										borderRadius: "20px",
										border: "none",
										borderBottom: "1px solid gray",
									}}
									placeholder="Entrer votre mot de passe..."
									onChange={(e) =>
										this.setState({
											password: e.target.value,
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
								Login
							</button>
						</div>
						<p className="forgot-password text-center">
							Vous n'avez pas encore de compte ?{" "}
							<Link to="/signup"> Sign Up  </Link> 
						</p>
					</form>
				</div>

				
			</div>
		);
	}
}
