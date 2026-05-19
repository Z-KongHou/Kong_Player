import { useState } from 'react'
import { TitleBar } from '@/components'
import { useAuth } from '@/auth/useAuth'
import { AuthApiError } from '@/types/auth'

const inputClass =
  'w-full rounded-lg border border-[#E8EAED] dark:border-[#2F3134] bg-white dark:bg-[#1E2022] px-3 py-2 text-sm text-gray-900 dark:text-[#E0E2E5] placeholder:text-[#61666D] dark:placeholder:text-[#A0A5AC] outline-none focus:border-[#3285FF] focus:ring-1 focus:ring-[#3285FF] transition-colors duration-[750ms]'

const Profile = () => {
  const {
    user,
    accessToken,
    initializing,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
  } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [editName, setEditName] = useState('')
  const [editOpen, setEditOpen] = useState(false)

  const isLoggedIn = Boolean(user && accessToken)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      if (mode === 'login') {
        await login(email.trim(), password)
      } else {
        await register(email.trim(), password, name.trim() || undefined)
      }
      setPassword('')
      setName('')
    } catch (err) {
      const msg =
        err instanceof AuthApiError
          ? err.message
          : '请求失败，请检查网络或后端服务'
      setError(msg)
    } finally {
      setPending(false)
    }
  }

  const handleLogout = async () => {
    setError(null)
    setPending(true)
    try {
      await logout()
      setEditOpen(false)
    } catch {
      setError('退出失败')
    } finally {
      setPending(false)
    }
  }

  const handleSaveProfile = async () => {
    setError(null)
    setPending(true)
    try {
      await updateProfile({ name: editName.trim() || undefined })
      setEditOpen(false)
    } catch (err) {
      const msg = err instanceof AuthApiError ? err.message : '保存失败'
      setError(msg)
    } finally {
      setPending(false)
    }
  }

  const openEdit = () => {
    setEditName(user?.name ?? '')
    setEditOpen(true)
    setError(null)
  }

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-white dark:bg-[#18191C] transition-colors duration-[750ms] ease-in-out">
      <TitleBar title="个人主页" />
      <div className="flex-1 overflow-auto min-h-0 px-10 py-12">
        <div className="max-w-xl space-y-10">
          {initializing ? (
            <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
              正在同步登录状态…
            </p>
          ) : isLoggedIn && user ? (
            <>
              <div className="flex items-start gap-8">
                <div
                  className="shrink-0 w-24 h-24 rounded-full bg-[#E8EAED] dark:bg-[#2F3134] border border-[#E8EAED] dark:border-[#2F3134] transition-colors duration-[750ms] overflow-hidden"
                  aria-hidden={!user.avatarUrl}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 pt-1 space-y-2">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-[#E0E2E5] transition-colors duration-[750ms]">
                    {user.name || user.email.split('@')[0]}
                  </h1>
                  <p className="text-sm text-[#61666D] dark:text-[#A0A5AC] transition-colors duration-[750ms]">
                    {user.email}
                  </p>
                  <p className="text-xs text-[#61666D] dark:text-[#A0A5AC]">
                    角色：{user.role}
                    {hasRole('admin') ? ' · 管理员权限' : null}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={openEdit}
                      className="text-sm font-medium text-[#3285FF] hover:opacity-85 transition-opacity duration-200"
                    >
                      编辑资料
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      disabled={pending}
                      className="text-sm font-medium text-[#61666D] dark:text-[#A0A5AC] hover:text-[#3285FF] dark:hover:text-[#3285FF] transition-colors duration-200 disabled:opacity-50"
                    >
                      退出登录
                    </button>
                  </div>
                </div>
              </div>

              {editOpen ? (
                <div className="rounded-xl border border-[#E8EAED] dark:border-[#2F3134] bg-[#F6F7F8]/80 dark:bg-[#1E2022]/80 p-5 space-y-4 transition-colors duration-[750ms]">
                  <label className="block text-xs font-medium text-[#61666D] dark:text-[#A0A5AC]">
                    显示名称
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className={`mt-1 ${inputClass}`}
                      placeholder="昵称"
                      autoComplete="nickname"
                    />
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleSaveProfile()}
                      disabled={pending}
                      className="rounded-lg bg-[#3285FF] text-white text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditOpen(false)}
                      className="rounded-lg border border-[#E8EAED] dark:border-[#2F3134] text-sm px-4 py-2 text-gray-700 dark:text-[#E0E2E5] hover:bg-[#E8EAED]/60 dark:hover:bg-[#2F3134]/60 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-[#61666D] dark:text-[#A0A5AC] leading-relaxed">
                登录后可同步个人资料并与后端鉴权接口对接。默认连接{' '}
                <code className="text-[#3285FF] text-xs">
                  http://localhost:8080
                </code>
                ，可通过环境变量{' '}
                <code className="text-[#3285FF] text-xs">
                  VITE_API_BASE_URL
                </code>{' '}
                修改。
              </p>

              <div className="flex gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setError(null)
                  }}
                  className={
                    mode === 'login'
                      ? 'font-semibold text-[#3285FF]'
                      : 'text-[#61666D] dark:text-[#A0A5AC] hover:text-[#3285FF]'
                  }
                >
                  登录
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    setError(null)
                  }}
                  className={
                    mode === 'register'
                      ? 'font-semibold text-[#3285FF]'
                      : 'text-[#61666D] dark:text-[#A0A5AC] hover:text-[#3285FF]'
                  }
                >
                  注册
                </button>
              </div>

              <form
                onSubmit={e => void handleSubmit(e)}
                className="space-y-4 max-w-sm"
              >
                {mode === 'register' ? (
                  <label className="block text-xs font-medium text-[#61666D] dark:text-[#A0A5AC]">
                    昵称（可选）
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={`mt-1 ${inputClass}`}
                      autoComplete="nickname"
                    />
                  </label>
                ) : null}
                <label className="block text-xs font-medium text-[#61666D] dark:text-[#A0A5AC]">
                  邮箱
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`mt-1 ${inputClass}`}
                    autoComplete="email"
                  />
                </label>
                <label className="block text-xs font-medium text-[#61666D] dark:text-[#A0A5AC]">
                  密码
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`mt-1 ${inputClass}`}
                    autoComplete={
                      mode === 'login' ? 'current-password' : 'new-password'
                    }
                  />
                </label>
                {error ? (
                  <p
                    className="text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-lg bg-[#3285FF] text-white text-sm font-medium px-5 py-2.5 hover:opacity-90 disabled:opacity-50 transition-opacity w-full sm:w-auto"
                >
                  {pending ? '请稍候…' : mode === 'login' ? '登录' : '注册'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
