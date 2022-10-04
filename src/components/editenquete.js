import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, Media, } from "reactstrap";
import Profil from "../components/assets/img/undraw_profile.svg"
import "../components/assets/css/sb-admin-2.min.css";
import "../components/assets/vendor/fontawesome-free/css/all.min.css";

function EditEnquete() {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
	const [profil, setProfil] = useState([])
	const [enqueteList, setEnqueteList] = useState([]);
	const [usersetId, setUserId] = useState("");
	const [nom, setNom] = useState("");
	const [newNom, setNewNom] = useState("");


	const getProfilUser = () => {
		Axios.get(`http://localhost:3600/api/auth/show/${userId}`)
			.then((response) => {
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])

	const addEnquete = (e) => {
	e.preventDefault();
		if (nom === "")
			alert("Le champ ne doit pas etre vide");
		else {
			fetch("http://localhost:3600/app/enquete", {
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
					nom,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message) {
						alert("Enquete créée avec succès");
						//initialiser le enqueteId pour les requette qui en aurons besoin
						fetch("http://localhost:3600/app/enquete", {
							headers: {
								Authorization: `Bearer ${JSON.parse(
									window.localStorage.getItem("userToken")
								)}`,
							},
						}).then((res) => {
							res.json().then((enquetes) => {
								window.localStorage.setItem(
									"enqueteId",
									JSON.stringify(enquetes[0]._id)
								);
								//tout s'est bien derouler
								window.location.href = "./enquete";
							});
						});
					} else {
						alert("Echec lors de la création de votre Enquete");
					}
				});
		}
	};

	const getEnquetes = () => {
		Axios.get("http://localhost:3600/app/enquete").then(
			(response) => {
				setEnqueteList(response.data);
			}
		);
	};
	useEffect(() => {
        getEnquetes();
    }, [])

	const updateEnqueteNom = (id) => {
		if (newNom ==="") {
			alert("Le champs ne doit pas être vide");
		} else {
			Axios.put(`http://localhost:3600/app/enquete/${id}`, {
				nom: newNom,
				_id: id,
			}).then((response) => {
				getEnquetes();
				if (response.status === 201) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			});
		}
	};


	const deleteEnquete = (id) => {
		Axios.delete(`http://localhost:3600/app/enquete/${id}`).then(
			(response) => {
				setEnqueteList(
					enqueteList.filter((val) => {
						return val._id !== id;
					})
				);
				if (response.status === 200) alert(response.data.message);
				else alert("Verifiez vos champs et recommencez");
			}
		);
	};

	const checkEnquete = (enqueteId) => {
		fetch(`http://localhost:3600/app/enquete/${enqueteId}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					window.localStorage.getItem("userToken")
				)}`,
			},
		}).then((res) => {
			res.json().then((enquete) => {
				window.localStorage.setItem(
					"enqueteId",
					JSON.stringify(enquete._id)
				);
				alert("Changement de enquete reussie");
			});
		});
	};
	const rendered = (enqueteId) => {
		if (JSON.parse(window.localStorage.getItem("enqueteId")) === enqueteId) {
			return (
				<input
					className="form-check-input p-2 w-25"
					type="radio"
					name="checkFerme"
					value="check"
					defaultChecked
					onInput={() => {
						checkEnquete(enqueteId);
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
						checkEnquete(enqueteId);
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
															<ul className="navbar-nav navbar-nav-right">
																<Media className="align-items-center">
																	<Media className="ml-2 d-none d-lg-block">
																		<span className="mb-0 text-sm font-weight-bold">
																			{profil.nom}
																		</span>
																	</Media>
																	<li className="nav-item nav-profile dropdown">
																		<a
																			className="nav-link dropdown-toggle"
																			href="#"
																			data-toggle="dropdown"
																			id="profileDropdown"
																		>
																			<img className="img-profile rounded-circle"
																			src={ Profil}/>
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
									<h1 className="h3 mb-0 text-gray-800">Enquetes</h1>
								</div>
							</div>
        
							<Popup
		trigger={
			<button className="btn btn-primary mb-4">
				{" "}
				Ajouter une Enquete{" "}
			</button>
		}
		position="bottom top"
	>
		{(close) => (
			<div className="popup-add">
				<a className="close" onClick={close}>
					&times;
				</a>
				<h2 className="">Ajouter une Nouvelle Enquete</h2>
				<form onSubmit={addEnquete} className="forms-sample">
					<div className="form-group">
						<input
							type="hidden"
							onChange={(event) => {
								setUserId(event.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Nom de l'enquete:</label>
						<input
							type="text"
							onChange={(event) => {
								setNom(event.target.value);
							}}
							className="form-control"
							placeholder="Nom de l'enquete..."
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
											<th> Selectionner <br/> Enquete</th>
											<th> Nom </th>
											<th> Action </th>
											<th> Question </th>
										</tr>
									</thead>
									<tbody>
										{enqueteList.map((val) => (
											<tr key={val._id}>
												<td>
													<div
														className="form-check text-center"
														title="Switcher de ferme"
													>
														{rendered(val._id)}
													</div>
												</td>
												<td>{val.nom}</td>
												<td>
													<Popup
														trigger={
															<button className="btn btn-outline-primary btn-fw">
																{" "}
																Modifier{" "}
															</button>
														}
														position="center center"
													>
														{(close) => (
															<div className="popup-update">
																<div className="form-group">
																	<input
																		type="text"
																		placeholder={val.nom}
																		onChange={(event) => {
																			setNewNom(
																				event.target
																					.value
																			);
																		}}
																		className="form-control form-perso"
																	/>
																	<button
																		className="btn btn-outline-success btn-fw"
																		onClick={() => {
																			updateEnqueteNom(
																				val._id
																			);
																		}}
																	>
																		{" "}
																		Mettre à jour
																	</button>
																</div>
																<button
																	style={{
																		marginLeft: "10px",
																	}}
																	className="btn btn-primary"
																	onClick={close}
																>
																	Fermer
																</button>
															</div>
														)}
													</Popup>
													<Popup
														trigger={
															<button className="btn btn-outline-danger btn-fw">
																{" "}
																Supprimer{" "}
															</button>
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
																		deleteEnquete(val._id);
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
													<td>
													<div className="btn btn-primary">
													<div
														className="form-check text-center"
														title="Switcher de ferme"
													>
														{rendered(val._id)}
													<Link to="/pages/dashboard/enquete/question">
														<span className="btnO btn-primary px-3">Voir</span>
													</Link>
													</div>
													</div>
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

export default EditEnquete;

