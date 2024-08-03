import React from 'react';

export const Profile = () => {
  return (
    <div className="container ">
      <div className="">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">User</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>
        {/* /Breadcrumb */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card shadow-md rounded-lg overflow-hidden">
              <div className="card-body">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-full w-32"
                  />
                  <div className="mt-3">
                    <h4 className="text-xl font-semibold">John Doe</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-gray-600 text-sm">
                      Bay Area, San Francisco, CA
                    </p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary ml-2">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h6 className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.293 4.293a1 1 0 0 1 1.414-1.414L13 8.586V7a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h1.586l-3.293-3.293a1 1 0 0 1-.293-.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Website
                  </h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item">
                  <h6 className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 1a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5zm4 12.5v-9l6 4.5-6 4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Github
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item">
                  <h6 className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Twitter
                  </h6>
                  <span className="text-secondary">@bootdey</span>
                </li>
                <li className="list-group-item">
                  <h6 className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        clipRule="evenodd"
                      />
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Instagram
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item">
                  <h6 className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Facebook
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="card mb-6">
              <div className="card-body">
                <div className="mb-4">
                  <h6 className="font-bold">Full Name</h6>
                  <p className="text-secondary">Kenneth Valdez</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                  <h6 className="font-bold">Email</h6>
                  <p className="text-secondary">fip@jukmuh.al</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                  <h6 className="font-bold">Phone</h6>
                  <p className="text-secondary">(239) 816-9029</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                  <h6 className="font-bold">Mobile</h6>
                  <p className="text-secondary">(320) 380-4539</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                  <h6 className="font-bold">Address</h6>
                  <p className="text-secondary">Bay Area, San Francisco, CA</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-end">
                  <a
                    className="btn btn-info"
                    target="__blank"
                    href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="mb-6">
                <div className="card h-full">
                  <div className="card-body">
                    <h6 className="flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.293 4.293a1 1 0 0 1 1.414-1.414L13 8.586V7a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h1.586l-3.293-3.293a1 1 0 0 1-.293-.707z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3">
                      <div className="progress mb-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
// ... existing code ...
                      <div className="progress mb-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
// ... existing code ...
                      <div className="progress mb-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
// ... existing code ...
                      <div className="progress mb-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
// ... existing code ...
                      <div className="progress mb-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="card h-full">
                    <div className="card-body">
                      <h6 className="flex items-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.293 4.293a1 1 0 0 1 1.414-1.414L13 8.586V7a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h1.586l-3.293-3.293                      L-3.293-3.293a1 1 0 0 1-.293-.707z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Project Status
                      </h6>
                      <small>Web Design</small>
                      <div className="progress mb-3">

                        <div

                          className="progress-bar bg-primary"

                          role="progressbar"

                          style={{ width: "80%" }}

                          aria-valuenow={80}

                          aria-valuemin={0}

                          aria-valuemax={100}

                        ></div>

                      </div>

// ... existing code ...

                      <div className="progress mb-3">

                        <div

                          className="progress-bar bg-primary"

                          role="progressbar"

                          style={{ width: "72%" }}

                          aria-valuenow={72}

                          aria-valuemin={0}

                          aria-valuemax={100}

                        ></div>

                      </div>

// ... existing code ...

                      <div className="progress mb-3">

                        <div

                          className="progress-bar bg-primary"

                          role="progressbar"

                          style={{ width: "89%" }}

                          aria-valuenow={89}

                          aria-valuemin={0}

                          aria-valuemax={100}

                        ></div>

                      </div>

// ... existing code ...

                      <div className="progress mb-3">

                        <div

                          className="progress-bar bg-primary"

                          role="progressbar"

                          style={{ width: "55%" }}

                          aria-valuenow={55}

                          aria-valuemin={0}

                          aria-valuemax={100}

                        ></div>

                      </div>

// ... existing code ...

                      <div className="progress mb-3">

                        <div

                          className="progress-bar bg-primary"

                          role="progressbar"

                          style={{ width: "66%" }}

                          aria-valuenow={66}

                          aria-valuemin={0}

                          aria-valuemax={100}

                        ></div>

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
