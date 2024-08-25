// src/ContactPage.js

import { useTanstackMutation } from "../../common/hooks/useTanstackQuery";

const ContactPage = () => {
  const { form, onSubmit } = useTanstackMutation({
    path: `feedback`,
    action: "CREATE",
    navigatePage: "/",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          {/* Contact Information */}
          <div className="lg:w-1/2 lg:pr-8 mb-14 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> anhntph30810@binhanstore.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>SĐT:</strong> +8439 456 7890
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Địa chỉ:</strong> 1234 Đường 343, Hà Nội, Việt Nam
            </p>
            <p className="text-gray-700">
              <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 6, 9:00 - 17:00
            </p>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-center lg:text-left mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên:
                </label>
                <input
                  type="text"
                  {...form.register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your name"
                />
                {form.formState.errors.name && (
                  <span className="text-red-500">
                    {form.formState.errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lời nhắn:
                </label>
                <textarea
                  id="message"
                  {...form.register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long",
                    },
                  })}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your message"
                ></textarea>
                {form.formState.errors.message && (
                  <span className="text-red-500">
                    {form.formState.errors.message.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Gửi lời nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
