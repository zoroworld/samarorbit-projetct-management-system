
import { Link } from "react-router-dom";



const UserOverview = ({user}) => {

  const logoutHandle = () => {
    if (!user) {
      return;
    }
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="overview">
       <div className="body-wrapper">
        <div className="body-wrapper-inner">
          <div className="container-fluid">
         

            {/* <!--  Row 1 --> */ }
            <div className="row">
              <div className="col-lg-8 d-flex align-items-strech">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="">
                        <h5 className="card-title fw-semibold">Profit & Expenses</h5>
                      </div>
                      <div className="dropdown">
                        <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                          className="rounded-circle btn-transparent rounded-circle btn-sm px-1 btn shadow-none">
                          <i className="ti ti-dots-vertical fs-7 d-block"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li>
                            <a className="dropdown-item" href="#">Another action</a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">Something else here</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="profit"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 col-sm-6">
                    {/* <!-- Yearly Breakup --> */}
                    <div className="card overflow-hidden">
                      <div className="card-body p-4">
                        <h5 className="card-title mb-10 fw-semibold">Traffic Distribution</h5>
                        <div className="row align-items-center">
                          <div className="col-7">
                            <h4 className="fw-semibold mb-3">$36,358</h4>
                            <div className="d-flex align-items-center mb-2">
                              <span
                                className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-up-left text-success"></i>
                              </span>
                              <p className="text-dark me-1  mb-0">+9%</p>
                              <p className=" mb-0">last year</p>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <span className="round-8 bg-primary rounded-circle me-2 d-inline-block"></span>
                                <span className="fs-2">Oragnic</span>
                              </div>
                              <div>
                                <span className="round-8 bg-danger rounded-circle me-2 d-inline-block"></span>
                                <span className="fs-2">Refferal</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-5">
                            <div className="d-flex justify-content-center">
                              <div id="grade"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6">
                    {/* <!-- Monthly Earnings --> */}
                    <div className="card">
                      <div className="card-body">
                        <div className="row alig n-items-start">
                          <div className="col-8">
                            <h5 className="card-title mb-10 fw-semibold"> Product Sales</h5>
                            <h4 className="fw-semibold mb-3">$6,820</h4>
                            <div className="d-flex align-items-center pb-1">
                              <span
                                className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-down-right text-danger"></i>
                              </span>
                              <p className="text-dark me-1  mb-0">+9%</p>
                              <p className=" mb-0">last year</p>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end">
                              <div
                                className="text-white bg-danger rounded-circle p-6 d-flex align-items-center justify-content-center">
                                <i className="ti ti-currency-dollar fs-6"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="earning"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <h5 className="card-title fw-semibold">Upcoming Schedules</h5>
                    </div>
                    <ul className="timeline-widget mb-0 position-relative mb-n5">
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">09:30</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1">Payment received from John Doe of $385.90</div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">10:00 am</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-info flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1 fw-semibold">New sale recorded <a
                            href="javascript:void(0)" className="text-primary d-block fw-normal">#ML-3467</a>
                        </div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 am</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-success flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1">Payment was made of $64.95 to Michael</div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1 fw-semibold">New sale recorded <a
                            href="javascript:void(0)" className="text-primary d-block fw-normal">#ML-3467</a>
                        </div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1 fw-semibold">New arrival recorded
                        </div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 am</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-success flex-shrink-0 my-2"></span>
                        </div>
                        <div className="timeline-desc  text-dark mt-n1">Payment Done</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="d-flex mb-4 justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Top Paying Clients</h5>

                      <div className="dropdown">
                        <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                          className="rounded-circle btn-transparent rounded-circle btn-sm px-1 btn shadow-none">
                          <i className="ti ti-dots-vertical fs-7 d-block"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li>
                            <a className="dropdown-item" href="#">Another action</a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">Something else here</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="table-responsive" data-simplebar>
                      <table className="table table-borderless align-middle text-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">Profile</th>
                            <th scope="col">Hour Rate</th>
                            <th scope="col">Extra classNamees</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user1.jpg" width="50" className="rounded-circle"
                                    alt="" />
                                </div>

                                <div>
                                  <h6 className="mb-1 fw-bolder">Mark J. Freeman</h6>
                                  <p className=" mb-0">Prof. English</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0">$150/hour</p>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0 text-success">
                                +53
                              </p>
                            </td>
                            <td>
                              <span
                                className="badge bg-light-success rounded-pill text-success px-3 py-2 ">Available</span>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user2.jpg" width="50" className="rounded-circle"
                                    alt="" />
                                </div>

                                <div>
                                  <h6 className="mb-1 fw-bolder">Nina R. Oldman</h6>
                                  <p className=" mb-0">Prof. History</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0">$150/hour</p>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0 text-success">
                                +68
                              </p>
                            </td>
                            <td>
                              <span className="badge bg-light-primary rounded-pill text-primary px-3 py-2 ">In
                                className</span>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user3.jpg" width="50" className="rounded-circle"
                                    alt="" />
                                </div>

                                <div>
                                  <h6 className="mb-1 fw-bolder">Arya H. Shah</h6>
                                  <p className=" mb-0">Prof. Maths</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0">$150/hour</p>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0 text-success">
                                +94
                              </p>
                            </td>
                            <td>
                              <span className="badge bg-light-danger rounded-pill text-danger px-3 py-2 ">Absent</span>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user4.jpg" width="50" className="rounded-circle"
                                    alt="" />
                                </div>

                                <div>
                                  <h6 className="mb-1 fw-bolder">June R. Smith</h6>
                                  <p className=" mb-0">Prof. Arts</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0">$150/hour</p>
                            </td>
                            <td>
                              <p className=" fw-normal mb-0 text-success">
                                +27
                              </p>
                            </td>
                            <td>
                              <span className="badge bg-light-warning rounded-pill text-warning px-3 py-2 ">On
                                Leave</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    {/* <a href="javascript:void(0)"><img src="../assets/images/products/s4.jpg"
                        className="card-img-top rounded-0" alt="..."></a> */}
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i
                        className="ti ti-basket fs-4"></i></a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Boat Headphone</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">$50 <span
                          className="ms-2 fw-normal text-muted "><del>$65</del></span></h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                        <li><a className="" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    {/* <a href="javascript:void(0)"><img src="../assets/images/products/s5.jpg"
                        className="card-img-top rounded-0" alt="..."></a> */}
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i
                        className="ti ti-basket fs-4"></i></a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">MacBook Air Pro</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">$650 <span
                          className="ms-2 fw-normal text-muted "><del>$900</del></span></h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                        <li><a className="" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    {/* <a href="javascript:void(0)"><img src="../assets/images/products/s7.jpg"
                        className="card-img-top rounded-0" alt="..."></a> */}
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i
                        className="ti ti-basket fs-4"></i></a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Red Valvet Dress</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">$150 <span
                          className="ms-2 fw-normal text-muted "><del>$200</del></span></h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                        <li><a className="" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    {/* <a href="javascript:void(0)"><img src="../assets/images/products/s11.jpg"
                        className="card-img-top rounded-0" alt="..."></a> */}
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i
                        className="ti ti-basket fs-4"></i></a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Cute Soft Teddybear</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">$285 <span
                          className="ms-2 fw-normal text-muted "><del>$345</del></span></h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star-filled text-warning"></i></a>
                        </li>
                        <li><a className="me-1" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                        <li><a className="" href="javascript:void(0)"><i className="ti ti-star text-warning"></i></a></li>
                      </ul>
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
}

export default UserOverview;