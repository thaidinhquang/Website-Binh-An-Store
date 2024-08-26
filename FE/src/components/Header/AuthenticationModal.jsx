import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../Auth/core/Auth';
import { setAuth } from '../Auth/core/AuthHelper';
import { axiosPost } from '../../config/axios';
import { getUserByToken } from '../Auth/core/_request';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTanstackMutation } from '../../common/hooks/useTanstackQuery';
const AuthenticationModal = () => {
  const search = new URLSearchParams(useLocation().search);
  const openform = search.get('openform') || false;
  const [status, setStatus] = useState('login');
  const [path, setPath] = useState('sign-in');
  const [isOpen, setIsOpen] = useState(openform);
  const { setCurrentUser } = useContext(AuthContext);
  const { mutate: sendOTP } = useTanstackMutation({
    path: `auth/send-otp`,
    action: "CREATE",
  });
  const [countDown, setCountDown] = useState(0);
  const form = useForm();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(openform);
  }, [openform]);
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000)
    }
  }, [countDown])
  useEffect(() => {
    if (status == 'login') {
      setPath('sign-in')
    }
    else if (status == 'register') {
      setPath('sign-up')
    }
    else {
      setPath('reset-password')
    }
  }, [status])
  const onSendOTP = async () => {
    setCountDown(60)
    sendOTP({ email: form.getValues('email') })
  }
  const onSubmit = async (data) => {
    try {
      const res = await axiosPost(`auth/${path}`, data)
      if (res.accessToken) {
        localStorage.setItem('token', res.accessToken)
        const { data } = await getUserByToken();
        setCurrentUser(data)
        setAuth(data)
        // toast.success(`${status} successfully`)
        if(status == 'login'){
          toast.success('Đăng nhập thành công')
        }
        else if(status == 'register'){
          toast.success('Đăng kí thành công')
        }
        else if(status == 'recover password'){
          toast.success('Khôi phục mật khẩu thành công')
        }
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden={!isOpen}
        className={`${isOpen ? 'flex' : 'hidden'
          } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-950 bg-opacity-40 w-full h-full z-50 justify-center items-center`}
      > 
        <div className="relative p-2 w-full max-w-md ">
          {/* Modal content */}
          <div className="relative max-h-screen bg-white rounded-lg py-2 shadow dark:bg-gray-700 overflow-y-auto scrollbar-hide">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
                {status}
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
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <svg className='absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
                    <div className='flex items-center'>
                      <input
                        type="email"
                        {...form.register('email', { required: 'Email không được để trống!', pattern: { value: /^\S+@\S+$/i, message: 'Email không đúng định dạng' } })}
                        className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        autoComplete="username"
                      />
                      {status === 'recover password' && (
                        <button type='button' onClick={() => onSendOTP()} className={`my-auto bg-gray-400 border-b-2 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 w-12 ${countDown > 0 ? "text-red-500" : "text-blue-400"}`}>
                          {countDown > 0 ? countDown : 'Gửi'}
                        </button>
                      )}
                    </div>
                  </div>
                  {form.formState.errors.email && (
                    <p className="mt-1 mt-1 text-red-500 text-sm">{form.formState.errors.email.message}</p>
                  )}

                </div>
                {status == 'recover password' && (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      OTP
                    </label>
                    <div className=" relative">
                      <img src="https://www.svgrepo.com/show/368868/otp.svg" alt="" className='absolute top-1/2 left-2 transform -translate-y-1/2 w-[16px]' />
                      <input
                        type="otp"
                        {...form.register('otp', { required: 'OTP không được để trống!' })}
                        className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="12345"
                        autoComplete="otp"
                      />
                    </div>
                      {form.formState.errors.otp && <p className="mt-1 text-red-500 text-sm">{form.formState.errors.otp.message}</p>}
                  </div>)}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Mật khẩu {status != 'login' && 'mới'}
                  </label>
                  <div className="relative">
                    <svg className='absolute top-1/2 left-2 transform -translate-y-1/2 w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                    <input
                      type="password"
                      {...form.register('password', { required: 'Mật khẩu không được để trống!',  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số, và một ký tự đặc biệt (!@#$%^&*)' } })}
                      placeholder="••••••••"
                      className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      autoComplete="current-password"
                    />
                  </div>
                    {form.formState.errors.password && <p className="mt-1 text-red-500 text-sm">{form.formState.errors.password.message}</p>}
                </div>
                {status != 'login' && (
                  <>
                    <div>
                      <label
                        htmlFor="cPassword"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <svg className='absolute top-1/2 left-2 transform -translate-y-1/2 w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                        <input
                          type="password"
                          {...form.register('cPassword', {
                            required: 'Mật khẩu không được để trống!',
                            validate: value => value === form.watch('password') || 'Mật khẩu xác nhận không khớp!'
                          })}
                          placeholder="••••••••"
                          className="pl-8 bg-white border-b-2 border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          autoComplete="current-password"
                        />
                      </div>
                        {form.formState.errors.cPassword && <p className="mt-1 text-red-500 text-sm">{form.formState.errors.cPassword.message}</p>}
                    </div>
                  </>
                )}
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
                  {status != 'recover password' && (
                    <button
                      type="button"
                      onClick={() => setStatus('recover password')}
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#5a00b0] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 capitalize"
                >
                  {status}
                </button>
                <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300 mt-2">
                  {status == 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} {' '}
                  <button type='button' onClick={() => setStatus(status == 'login' ? 'register' : 'login')}
                    className="text-blue-700 hover:underline dark:text-blue-500 capitalize"
                  >
                    {status == 'login' ? 'Đăng ký' : 'Đăng nhập'}
                  </button>
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
