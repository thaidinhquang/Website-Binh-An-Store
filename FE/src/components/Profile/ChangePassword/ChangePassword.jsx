import { useTanstackMutation } from "../../../common/hooks/useTanstackQuery";

const ChangePassword = () => {
  const { form, mutate, isPending } = useTanstackMutation({
    path: `auth/change-password`,
    action: "CREATE",
    navigatePage: "/profile",
  });
  const onSubmit = (data) => {
    mutate(data)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="change-password-container max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Đổi Mật Khẩu</h1>
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <input
              {...form.register("oldPassword", { required: 'Mật khẩu không được để trống' })}
              type={"password"}
              placeholder="Mật khẩu hiện tại"
              className="input p-2 pr-14 bg-white border-black text-black w-full"
            />
            {form.formState.errors.oldPassword && <p className="text-red-500 text-sm">{form.formState.errors.oldPassword.message}</p>}
          </div>
          <div className="relative">
            <input
              {...form.register("newPassword", { required: 'Mật khẩu mới không được để trống', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số, và một ký tự đặc biệt (!@#$%^&*)' }, validate: (value) => value !== form.getValues("oldPassword") || 'Mật khẩu mới không được trùng với mật khẩu hiện tại' })}
              type={"password"}
              placeholder="Mật khẩu mới"
              className="input p-2 pr-14 bg-white border-black text-black w-full"
            />
            {form.formState.errors.newPassword && <p className="text-red-500 text-sm">{form.formState.errors.newPassword.message}</p>}
          </div>
          <div className="relative">
            <input
              {...form.register("confirmPassword", { required: 'Xác nhận mật khẩu mới không được để trống', validate: (value) => value === form.getValues("newPassword") || 'Mật khẩu xác nhận không trùng khớp' })}
              type={"password"}
              placeholder="Xác nhận mật khẩu mới"
              className="input p-2 pr-14 bg-white border-black text-black w-full"
            />
            {form.formState.errors.confirmPassword && <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" disabled={isPending}
            className="btn bg-blue-500 text-white  py-2 rounded"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
