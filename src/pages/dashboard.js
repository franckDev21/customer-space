import React, { useState, useEffect } from "react";
import Axios from "axios";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, Media, } from "reactstrap";
import "../components/assets/css/sb-admin-2.min.css";
import "../components/assets/vendor/fontawesome-free/css/all.min.css";
import Profil from "../components/assets/img/undraw_profile.svg"


function Dashboard() {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
    const enqueteId = JSON.parse(window.localStorage.getItem("enqueteId"));
    const questionId = JSON.parse(window.localStorage.getItem("questionId"));
	const [profil, setProfil] = useState([]);
	// const setenqueteId = JSON.parse(window.localStorage.getItem("enqueteId"));
	const [data, setQuestionList] = useState([]);
    const [enquete, setEnqueteList] = useState([]);
	const [Enquetelength, setEnqueteLength] = useState([]);




	const getProfilUser = () =>{
		Axios.get(`http://localhost:3600/api/auth/show/${userId}`)
			.then((response) => {
				setProfil(response.data);
			})
		
	}
	// useEffect(() => {
    //     getProfilUser();
    // }, [])

	const getEnquetesLength = () => {
		Axios.get("http://localhost:3600/app/enquete").then(
			(response) => {
				setEnqueteLength(response.data);
			}
		);
	};
	useEffect(() => {
        getEnquetesLength();
    }, [])

	

	const getQuestions = () => {
		Axios.get(`http://localhost:3600/api/question/${questionId}`).then((response) => {
			setQuestionList(response.data);
		});
	};
	useEffect(() => {
        getQuestions();
    }, [])

    const getEnquetes = () => {
		Axios.get(`http://localhost:3600/app/enquete/${enqueteId}`).then(
			(response) => {
				setEnqueteList(response.data);
			}
		);
	};
	useEffect(() => {
        getEnquetes();
    }, [])


	

	
	

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
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                <a href="dashboard/enquete" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-download fa-sm text-white-50"></i> Nouvelle Enquete</a>       
                            </div>

                            <div className="row">

<div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Resultat glabal de toutes vos Enquetes </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">4,0</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Nombre D'enquetes </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{Enquetelength.length}</div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Nombre de Reponse</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">100</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Resultat de l'enquete encours</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.results}</div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>

</div>
<div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Détails enquête en cours : {enquete.nom}</h6>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Libellé</th>
                            <th>Resultat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{data.question1} </td>
                            <td>{data.reponse1}</td>
                           
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>{data.question2} </td>
                            <td>{data.reponse2}</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>{data.question3} </td>
                            <td>{data.reponse3}</td>
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>{data.question4} </td>
                            <td>{data.reponse4}</td>
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>{data.question5} </td>
                            <td>{data.reponse5}</td>
                        </tr>
                      </tbody>  


                    </table>
            </div>
        </div>
</div>

<div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Recommendation</h6>
                </div>
                <div className="card-body">
                    <p>Consulter touts les Recommendation, commentaire et avis de vos client ici. Cette information permet de constater le résultat de toutes les enquetes effectuées par votre entreprise</p>
                    
                    <a href="/pages/dashboard/enquete/results" className="btn btn-primary">Consulter</a>

                </div>
</div>
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

export default Dashboard;
