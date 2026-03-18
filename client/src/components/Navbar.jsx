import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, PencilLine, LogOut, Bell, Search, User } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/users/notifications`, { credentials: "include" })
        .then((res) => res.ok ? res.json() : [])
        .then((data) => setNotifications(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, [user, location.pathname]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async () => {
    await fetch(`${API_URL}/api/users/notifications/read`, {
      method: "PUT",
      credentials: "include",
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#282a36]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] bg-clip-text text-transparent hover:from-[#ff79c6] hover:to-[#8be9fd] transition-all duration-500"
        >
          blue
        </Link>

        {/* Center: Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 mx-6 max-w-md"
        >
          <div className="flex items-center w-full bg-[#343746] rounded-xl px-4 py-2 border border-white/5 focus-within:border-[#bd93f9]/50 focus-within:shadow-glow-purple transition-all duration-300">
            <Search size={16} className="text-[#6272a4] mr-2" />
            <input
              type="text"
              placeholder="Search posts..."
              className="bg-transparent w-full focus:outline-none text-sm text-[#f8f8f2] placeholder-[#6272a4]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right: User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/login")
                    ? "text-[#bd93f9] bg-[#bd93f9]/10"
                    : "text-[#f8f8f2]/70 hover:text-[#f8f8f2] hover:bg-[#343746]"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] text-[#282a36] hover:shadow-glow-purple transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1.5 text-sm font-medium text-[#282a36] bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] px-4 py-2 rounded-xl hover:shadow-glow-purple transition-all duration-300"
              >
                <PencilLine size={15} /> Write
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifs(!showNotifs);
                    if (!showNotifs && unreadCount > 0) markRead();
                  }}
                  className="relative p-2 rounded-xl text-[#f8f8f2]/70 hover:text-[#8be9fd] hover:bg-[#343746] transition-all duration-300"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff79c6] rounded-full text-[10px] font-bold text-[#282a36] flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#343746] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-3 border-b border-white/5 text-sm font-semibold text-[#f8f8f2]">
                      Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-sm text-[#6272a4] text-center">
                          No notifications yet
                        </p>
                      ) : (
                        notifications.slice(0, 10).map((n) => (
                          <div
                            key={n._id}
                            className={`px-4 py-3 border-b border-white/5 text-sm ${
                              n.read ? "text-[#6272a4]" : "text-[#f8f8f2]"
                            }`}
                          >
                            <span className="font-medium text-[#bd93f9]">
                              {n.sender?.username}
                            </span>{" "}
                            {n.type === "follow" && "started following you"}
                            {n.type === "comment" && (
                              <>
                                commented on{" "}
                                <span className="text-[#ff79c6]">
                                  {n.post?.title}
                                </span>
                              </>
                            )}
                            {n.type === "like" && (
                              <>
                                liked{" "}
                                <span className="text-[#ff79c6]">
                                  {n.post?.title}
                                </span>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to={`/profile/${user.id}`}
                className="flex items-center gap-2 text-sm text-[#f8f8f2]/70 hover:text-[#8be9fd] px-2 py-1.5 rounded-xl hover:bg-[#343746] transition-all duration-300"
              >
                <User size={16} />
                <span className="hidden lg:inline">{user.username}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-[#f8f8f2]/50 hover:text-[#ff5555] px-2 py-1.5 rounded-xl hover:bg-[#ff5555]/10 transition-all duration-300"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#bd93f9]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3 bg-[#282a36]/95 backdrop-blur-xl border-t border-white/5 text-sm font-medium">
          <form onSubmit={handleSearch} className="mb-1">
            <div className="flex items-center bg-[#343746] rounded-xl px-4 py-2 border border-white/5">
              <Search size={16} className="text-[#6272a4] mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent w-full focus:outline-none text-sm text-[#f8f8f2] placeholder-[#6272a4]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-[#f8f8f2]/70 hover:text-[#f8f8f2] py-1"
          >
            Home
          </Link>
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-[#f8f8f2]/70 hover:text-[#bd93f9] py-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-[#282a36] bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] px-4 py-2 rounded-xl text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1.5 text-[#282a36] bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] px-4 py-2 rounded-xl justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <PencilLine size={16} /> Write Post
              </Link>
              <Link
                to={`/profile/${user.id}`}
                onClick={() => setMenuOpen(false)}
                className="text-[#f8f8f2]/70 hover:text-[#8be9fd] py-1"
              >
                Profile ({user.username})
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[#ff5555] hover:text-[#ff5555] py-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
