import React, { useState, useEffect } from "react";
import Axios from "axios";
import "reactjs-popup/dist/index.css";
import "../components/assets/styles/form.css";
import { Link } from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, Media, } from "reactstrap";
import Profil from "../components/assets/img/undraw_profile.svg"


function Commentaire() {

    const userId = JSON.parse(window.localStorage.getItem("userId"));
	const [profil, setProfil] = useState([])
    // const enqueteId = JSON.parse(window.localStorage.getItem("enqueteId"));
    const questionId = JSON.parse(window.localStorage.getItem("questionId"));
    const [data, setQuestionList] = useState([]);
	
   

	const getProfilUser = () =>{
		Axios.get(`http://localhost:3600/api/auth/show/${userId}`)
			.then((response) => {
				// console.log(response.data)
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])
	

	const getQuestions = () => {
		Axios.get(`http://localhost:3600/api/question/${questionId}`).then((response) => {
			setQuestionList(response.data);
			// console.log(response.data)
		});
	};

    // useEffect(() => {
    //     getQuestions();
    // }, [])
	
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
																	<li className="nav-item nav-profile dropdown">
																		<a
																			className="nav-link dropdown-toggle"
																			href="#dropdown"
																			data-toggle="dropdown"
																			id="profileDropdown"
																		>
																			<img className="img-profile rounded-circle"
																			src={ Profil} alt="photo de profil"/>
																		</a>
																	</li>
																	<Media className="ml-2 d-none d-lg-block">
																		<span className="mb-0 text-sm font-weight-bold">
																			{profil.nom}
																		</span>
																	</Media>
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
																to="/pages/dashboard"
																tag={Link}
															>
																<i className="ni ni-calendar-grid-58" />
																<span>Profil</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																to="/pages/dashboard/userprofil"
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
                  <h1 className="h3 mb-0 text-gray-800">Commentaire</h1>
              </div>
          </div>
          <div className="container px-3 my-5 clearfix">
          
    
          <div className="card">
              <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered m-0">
       <thead>
                        <tr>
                       <th className="text-center py-3 px-4">Commentaire enquete encours</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td className="p-10">
                             {data.commentaire}
                         </td>
                       </tr>
              </tbody>
                    </table>
                  </div>
                <div>
        </div>
          </div>
      </div>
              </div>
        
        </div>
      <footer className="sticky-footer bg-white">
          <div className="container my-auto">
              <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
              </div>
          </div>
      </footer>
  </div>
       </div>			
      </div>
            
		
	);
}

export default Commentaire;


        