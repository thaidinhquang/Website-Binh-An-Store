import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../Auth/core/Auth';
import { setAuth } from '../Auth/core/AuthHelper';
import { axiosPost } from '../../config/axios';
import { getUserByToken } from '../Auth/core/_request';
import {faFacebook, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
const AuthenticationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useContext(AuthContext);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosPost('/auth/sign-in', { email, password })
            if (res.accessToken) {
                localStorage.setItem('token', res.accessToken)
                const { data } = await getUserByToken();
                setCurrentUser(data)
                setAuth(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    };
    return (
        <>
           <div
  id="authentication-modal"
  tabIndex="-1"
  aria-hidden={!isOpen}
  className={`${
    isOpen ? 'flex' : 'hidden'
  } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-950 bg-opacity-40 w-full h-full z-50 justify-center items-center`}
>
  <div className="relative p-2 w-full max-w-md">
    {/* Modal content */}
    <div className="relative h-[600px] bg-white rounded-lg shadow dark:bg-gray-700">
      {/* Modal header */}
      <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Đăng Nhập
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      {/* Modal body */}
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
            >
              Email
            </label>
           <div className=" relative">
           <svg className='absolute top-1/2 left-2 transform -translate-y-1/2 w-[16px] bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
           <input
              type="email"
              name="email"
              id="email"
              className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
           </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
            >
              Mật khẩu
            </label>
            <div className="relative">
            <svg className='absolute top-1/2 left-2 transform -translate-y-1/2 w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center my-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nhớ mật khẩu
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Quên mật khẩu?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#5a00b0] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            Đăng nhập
          </button>
          <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300 mt-2">
            Chưa có tài khoản?{' '}
            <Link
              to={'/signup'}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Đăng ký
            </Link>
          </div>
          <div className="text-center mt-2">
          <FontAwesomeIcon icon={faFacebook} className='text-blue-800 text-[35px] hover:opacity-80 cursor-pointer' />
          <FontAwesomeIcon icon={faTwitter} className=' text-blue-600  text-[35px] mx-4 rounded-3xl hover:opacity-80 cursor-pointer' />
          <FontAwesomeIcon icon={faGoogle} className='text-orange-500 text-[35px] rounded-3xl hover:opacity-80 cursor-pointer' />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

            <div className="flex space-x-6 items-center">
                <button type="button" onClick={toggleModal} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Đăng nhập</button>
            </div>
        </>
    );
};

export default AuthenticationModal;