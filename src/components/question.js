import React, { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, Media, } from "reactstrap";
import Profil from "../components/assets/img/undraw_profile.svg"


function Question() {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
	const [profil, setProfil] = useState([]);
	const [enqueteId, setenqueteId] = useState(JSON.parse(window.localStorage.getItem("enqueteId")));

	const [question1, setQuestion1] = useState("");
	const [question2, setQuestion2] = useState("");
	const [question3, setQuestion3] = useState("");
	const [question4, setQuestion4] = useState("");
	const [question5, setQuestion5] = useState("");
	const [newQuestion1, setNewQuestion1] = useState("");
	const [newQuestion2, setNewQuestion2] = useState("");
	const [newQuestion3, setNewQuestion3] = useState("");
	const [newQuestion4, setNewQuestion4] = useState("");
	const [newQuestion5, setNewQuestion5] = useState("");
	const [questionList, setQuestionList] = useState([]);

	

	const getProfilUser = () =>{
		Axios.get(`http://localhost:3600/api/auth/show/${userId}`)
			.then((response) => {
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])

	const addQuestion = (e) => {
		e.preventDefault();
				fetch("http://localhost:3600/api/question", {
					method: "POST",
					crossDomain: true,
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"Access-Control-Allow-Origin": "*",
						Authorization: `Bearer ${JSON.parse(
							window.localStorage.getItem("userToken")
						)}`,
					},
					body: JSON.stringify({
						enqueteId,
						question1,
						question2,
						question3,
						question4,
						question5,

					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.message) {
							alert("question créée avec succès");
							//initialiser le enqueteId pour les requette qui en aurons besoin
							fetch(`http://localhost:3600/api/question/all/${enqueteId}`, {

								headers: {
									Authorization: `Bearer ${JSON.parse(
										window.localStorage.getItem("userToken")
									)}`,
								},
							}).then((res) => {
								res.json().then((questions) => {
			
									window.localStorage.setItem(
										"questionId",
										JSON.stringify(questions[0]._id)
									);
									//tout s'est bien derouler
								window.location.href = "./question";
								});
							});
						} else {
							alert("Echec lors de la création de vos questions");
						}
					});
			
		};

	const getQuestions = () => {
		Axios.get(`http://localhost:3600/api/question/all/${enqueteId}`).then((response) => {
			setQuestionList(response.data);
			response.data.forEach(data => {
				if(data.status===1){
					window.localStorage.setItem(
						"questionId",
						JSON.stringify(data._id)
						);
					}
			});
		});
	};
	useEffect(() => {
        getQuestions();
    }, [])

	const updateQ1 = (id) => {
		if (newQuestion1 === "") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`/api/question/${id}`, {
				question1: newQuestion1,
				_id: id,
			}).then((response) => {
				getQuestions();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};

	const updateQ2 = (id) => {
		if (newQuestion2 === "") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`/api/question/${id}`, {
				question2: newQuestion2,
				_id: id,
			}).then((response) => {
				getQuestions();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};
	const updateQ3 = (id) => {
		if (newQuestion3 === "") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`/api/question/${id}`, {
				question3: newQuestion3,
				_id: id,
			}).then((response) => {
				getQuestions();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};
	const updateQ4 = (id) => {
		if (newQuestion4 === "") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`/api/question/${id}`, {
				question4: newQuestion4,
				_id: id,
			}).then((response) => {
				getQuestions();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};
	const updateQ5 = (id) => {
		if (newQuestion5 === "") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`/api/question/${id}`, {
				question5: newQuestion5,
				_id: id,
			}).then((response) => {
				getQuestions();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};

	const deleteQuestion = (id) => {
		Axios.delete(`/api/question/${id}`).then((response) => {
			setQuestionList(
				questionList.filter((val) => {
					return val._id !== id;
				})
			);
			if (response.status === 200) alert(response.data.message);
			else alert("Verifiez vos champs et recommencez");
		});
	};

	const checkQuestion = (questionId) => {
		fetch(`http://localhost:3600/api/question/${questionId}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					window.localStorage.getItem("userToken")
				)}`,
			},
		}).then((res) => {
			res.json().then((question) => {
				window.localStorage.setItem(
					"questionId",
					JSON.stringify(question._id)
				);
				fetch(`http://localhost:3600/api/reponse/setstatus/${questionId}`, {
					headers: {
						Authorization: `Bearer ${JSON.parse(
							window.localStorage.getItem("userToken")
						)}`,
					},
				}).then((response)=>{
					response.json().then((resp)=>{
						alert(resp.message);
					})
				})				
			});
		});
	};
	const rendered = (questionId) => {
		if (JSON.parse(window.localStorage.getItem("questionId")) === questionId) {
			return (
				<input
					className="form-check-input p-2 w-25"
					type="radio"
					name="checkFerme"
					value="check"
					defaultChecked
					onInput={() => {
						checkQuestion(enqueteId,questionId);
					}}
				/>
			);
		} else {
			return (
				<input
					className="form-check-input p-2 w-5 ml-10"
					type="radio"
					name="checkFerme"
					value="check"
					onInput={() => {
						checkQuestion(enqueteId,questionId);
					}}
				/>
			);
		}
	};

	return (
		<div>
			<div id="wrapper">
				<ul className="navbar-nav  sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: "red" }}>
					<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
						<div className="sidebar-brand-icon rotate-n-15">
							<i className="fas fa-laugh-wink"></i>
						</div>
						<div className="sidebar-brand-text mx-3">Customer Services</div>
					</a>
					<hr className="sidebar-divider my-0"/>
					<li className="nav-item active">
						<a className="nav-link" href="/pages/dashboard">
							<i className="fas fa-fw fa-tachometer-alt"></i>
							<span>Dashboard</span></a>
					</li>
					<hr className="sidebar-divider"/>
					<div className="sidebar-heading">
						Interface
					</div>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/userprofil">
							<i className="fas fa-fw fa-chart-area"></i>
							<span>Profil</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/enquete">
							<i className="fas fa-fw fa-chart-area"></i>
							<span>Enquete</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/enquete/results">
							<i className="fas fa-fw fa-table"></i>
							<span>Commentaire</span></a>
					</li>
    				<hr className="sidebar-divider d-none d-md-block"/>
				</ul>

					<div id="content-wrapper" className="d-flex flex-column">
    					<div id="content">
					        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
							    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
									<i className="fa fa-bars"></i>
								</button>
            						<ul className="navbar-nav ml-auto">
										<div className="topbar-divider d-none d-sm-block"></div>
											<div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
												<Nav
													className="align-items-center d-none d-md-flex"
													navbar>
													<UncontrolledDropdown nav>
														<DropdownToggle className="pr-0" nav>
														<Media className="ml-2 d-none d-lg-block">
																		<span className="mb-0 text-sm font-weight-bold">
																			{profil.nom}
																		</span>
																	</Media>
															<ul className="navbar-nav navbar-nav-right">
																<Media className="align-items-center">
																	<li className="nav-item nav-profile dropdown">
																		<a
																			className="nav-link dropdown-toggle"
																			href="#dropdown"
																			data-toggle="dropdown"
																			id="profileDropdown"
																		>
																			<img className="img-profile rounded-circle"
																			src={ Profil} alt="profil"/>
																		</a>
																	</li>
																	
																</Media>
															</ul>
														</DropdownToggle>
														<DropdownMenu
															className="dropdown-menu-arrow"
															right
														>
															<DropdownItem
																className="noti-title"
																header
																tag="div"
															>
																<h6 className="text-overflow m-0">
																	Welcome !
																</h6>
															</DropdownItem>
															<DropdownItem
																to="/pages/dashboard"
																tag={Link}
															>
																<i className="ni ni-calendar-grid-58" />
																<span>Espace Utilisateur</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																to="/pages/dashboard/userprofil"
																tag={Link}
															>
																<i className="ni ni-calendar-grid-58" />
																<span>Profil</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																to="/pages/dashboard/enquete"
																tag={Link}
															>
																<i className="ni ni-settings-gear-65" />
																<span>Mes Enquetes</span>
															</DropdownItem>
															<DropdownItem divider />
														</DropdownMenu>
													</UncontrolledDropdown>
												</Nav>
											</div>
            						</ul>
        					</nav>
							<div className="container-fluid">
								<div className="d-sm-flex align-items-center justify-content-between mb-4">
									<h1 className="h3 mb-0 text-gray-800">Questions</h1>
								</div>
							</div>
        
							<Popup
									trigger={
										<button className="btn btn-primary mt-0 mb-4">
											{" "}
											Ajouté des questions
										</button>
									}
									position="bottom top"
								>
									{(close) => (
										<div className="popup-add">
											<a className="close" onClick={close}>
												&times;
											</a>
											<h2 className="">Ajouter des questions</h2>
											<form onSubmit={addQuestion} className="forms-sample">
												<div className="form-group">
													<input
														type="hidden"
														onChange={(event) => {
															setenqueteId(event.target.value);
														}}
													/>
												</div>
												<div className="form-group">
													<label>
														Q1:{" "}
														<span
															style={{
																fontWeight: "bold",
																color: "red",
															}}
														>
															*
														</span>
													</label>
													<input
														type="text"
														onChange={(event) => {
															setQuestion1(event.target.value);
														}}
														className="form-control"
														placeholder="Libelle de la question"
														required
													/>
												</div>

												<div className="form-group">
													<label>
														Q2:{" "}
														<span
															style={{
																fontWeight: "bold",
																color: "red",
															}}
														>
															*
														</span>
													</label>
													<input
														type="text"
														onChange={(event) => {
															setQuestion2(event.target.value);
														}}
														className="form-control"
														placeholder="Libelle de la question"
														required
													/>
												</div>
												<div className="form-group">
													<label>
														Q3:{" "}
														<span
															style={{
																fontWeight: "bold",
																color: "red",
															}}
														>
															*
														</span>
													</label>
													<input
														type="text"
														onChange={(event) => {
															setQuestion3(event.target.value);
														}}
														className="form-control"
														placeholder="Libelle de la question"
														required
													/>
												</div>
												<div className="form-group">
													<label>
														Q4:{" "}
														<span
															style={{
																fontWeight: "bold",
																color: "red",
															}}
														>
															*
														</span>
													</label>
													<input
														type="text"
														onChange={(event) => {
															setQuestion4(event.target.value);
														}}
														className="form-control"
														placeholder="Libelle de la question"
														required
													/>
												</div>
												<div className="form-group">
													<label>
														Q5:{" "}
														<span
															style={{
																fontWeight: "bold",
																color: "red",
															}}
														>
															*
														</span>
													</label>
													<input
														type="text"
														onChange={(event) => {
															setQuestion5(event.target.value);
														}}
														className="form-control"
														placeholder="Libelle de la question"
														required
													/>
												</div>

												<button type="submit" className="btn btn-success">
													Ajouter
												</button>
												<button
													style={{ marginLeft: "10px" }}
													className="btn btn-primary"
													onClick={close}
												>
													Fermer
												</button>
											</form>
										</div>
									)}
							</Popup>

							<div className="table-responsive" style={{ width: "100%" }}>

								<table className="table table-striped">
									<thead>
										<tr>
											<th className="text-center"> Selectionner <br/> Question</th>
											<th className="text-center"> Q1 </th>
											<th className="text-center"> Q2 </th>
											<th className="text-center"> Q3 </th>
											<th className="text-center"> Q4 </th>
											<th className="text-center"> Q5 </th>
										</tr>
									</thead>
									<tbody>
										{questionList.map((val) => (
											<tr key={val._id}>
												<td className="text-center">
													<div
														className="form-check text-center"
														title="Switcher de ferme"
													>
														{rendered(val._id)}
													</div>
												</td>
												<td className="text-center">
													{val.question1} <br/> {val.reponse1}
													<div className="mt-2">
														<Popup
															trigger={
																<a className=""> Modifier </a>
															}
															position="bottom center"
														>
															<div className="form-group text-center">
																<input
																	type="text"
																	placeholder={val.question1}
																	onChange={(event) => {
																		setNewQuestion1(
																			event.target.value
																		);
																	}}
																	className="form-control"
																/>
																<button
																	className="btn btn-outline-success mt-2 btn-fw"
																	onClick={() => {
																		updateQ1(val._id);
																	}}
																>
																	{" "}
																	Mettre à jour
																</button>
															</div>
														</Popup>
													</div>
												</td>
												<td className="text-center">
													{val.question2} <br/> {val.reponse2}
													<div className="mt-2">
														<Popup
															trigger={
																<a className=""> Modifier </a>
															}
															position="bottom center"
														>
															<div className="form-group text-center">
																<input
																	type="text"
																	placeholder={val.question2}
																	onChange={(event) => {
																		setNewQuestion2(
																			event.target.value
																		);
																	}}
																	className="form-control"
																/>
																<button
																	className="btn btn-outline-success mt-2 btn-fw"
																	onClick={() => {
																		updateQ2(val._id);
																	}}
																>
																	{" "}
																	Mettre à jour
																</button>
															</div>
														</Popup>
													</div>
												</td>
												<td className="text-center">
													{val.question3} <br/> {val.reponse3}
													<div className="mt-2">
														<Popup
															trigger={
																<a className=""> Modifier </a>
															}
															position="bottom center"
														>
															<div className="form-group text-center">
																<input
																	type="text"
																	placeholder={val.question3}
																	onChange={(event) => {
																		setNewQuestion3(
																			event.target.value
																		);
																	}}
																	className="form-control"
																/>
																<button
																	className="btn btn-outline-success mt-2 btn-fw"
																	onClick={() => {
																		updateQ3(val._id);
																	}}
																>
																	{" "}
																	Mettre à jour
																</button>
															</div>
														</Popup>
													</div>
												</td>
												<td className="text-center">
													{val.question4} <br/> {val.reponse4}
													<div className="mt-2">
														<Popup
															trigger={
																<a className=""> Modifier </a>
															}
															position="bottom center"
														>
															<div className="form-group text-center">
																<input
																	type="text"
																	placeholder={val.question4}
																	onChange={(event) => {
																		setNewQuestion4(
																			event.target.value
																		);
																	}}
																	className="form-control"
																/>
																<button
																	className="btn btn-outline-success mt-2 btn-fw"
																	onClick={() => {
																		updateQ4(val._id);
																	}}
																>
																	{" "}
																	Mettre à jour
																</button>
															</div>
														</Popup>
													</div>
												</td>
												<td className="text-center">
													{val.question5} <br/> {val.reponse5}
													<div className="mt-2">
														<Popup
															trigger={
																<a className=""> Modifier </a>
															}
															position="bottom center"
														>
															<div className="form-group text-center">
																<input
																	type="text"
																	placeholder={val.question5}
																	onChange={(event) => {
																		setNewQuestion5(
																			event.target.value
																		);
																	}}
																	className="form-control"
																/>
																<button
																	className="btn btn-outline-success mt-2 btn-fw"
																	onClick={() => {
																		updateQ5(val._id);
																	}}
																>
																	{" "}
																	Mettre à jour
																</button>
															</div>
														</Popup>
													</div>
												</td>
												<td className="text-center">
													<Popup
														trigger={
															<div className="">
																<a
																	className="text-danger text-decoration-underline"
																	style={{
																		fontWeight: "bold",
																	}}
																>
																	{" "}
																	Supprimer{" "}
																</a>
															</div>
														}
														position="left center"
													>
														{(close) => (
															<div className="p-2">
																<p>
																	Êtes-vous sur de vouloir
																	supprimer ?
																</p>
																<button
																	onClick={() => {
																		deleteQuestion(val._id);
																	}}
																	className="btn btn-danger"
																>
																	Oui
																</button>
																<button
																	style={{
																		marginLeft: "10px",
																	}}
																	className="btn btn-primary"
																	onClick={close}
																>
																	Non
																</button>
															</div>
														)}
													</Popup>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
    					</div>
   
							<footer className="sticky-footer bg-white">
								<div className="container my-auto">
									<div className="copyright text-center my-auto">
									<span>Copyright &copy; ALLHCorp 2022</span>
									</div>
								</div>
							</footer>
					</div>
			</div>
			
		</div>
	);
}

export default Question;
