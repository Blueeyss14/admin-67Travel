import colors from "../../../res/colors";
import useAdminLogin from "../hook/useAdminLogin";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading, loginError } = useAdminLogin();

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            style={{ color: colors.secondary }}
            className="mt-6 text-center text-3xl font-extrabold"
          >
            Login Admin
          </h2>
        </div>

        {loginError && (
          <div className="text-red-600 text-center mb-4 font-medium">
            {loginError}
          </div>
        )}

        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition-colors"
                placeholder="Masukkan alamat email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition-colors"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-white/80 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80 cursor-pointer">
                Ingatkan saya
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white cursor-pointer bg-white/20 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white/80 transition-colors disabled:opacity-50 backdrop-blur-[20px] border border-white/20"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
