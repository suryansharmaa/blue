import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Postcard from "@/components/Postcard";
import { UserPlus, UserMinus, Edit3, Calendar } from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const isOwner = user && user.id === id;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/users/${id}`).then((r) => r.json()),
      fetch(`${API_URL}/api/posts?author=${id}&limit=50`).then((r) => r.json()),
    ])
      .then(([profileData, postsData]) => {
        setProfile(profileData);
        setBio(profileData.bio || "");
        setPosts(postsData.posts || []);
        if (user) {
          setIsFollowing(
            profileData.followers?.some(
              (f) => (typeof f === "object" ? f._id : f) === user.id
            )
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleFollow = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/${id}/follow`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      setIsFollowing(data.following);
      setProfile((p) => ({
        ...p,
        followers: data.following
          ? [...(p.followers || []), { _id: user.id }]
          : (p.followers || []).filter(
              (f) => (typeof f === "object" ? f._id : f) !== user.id
            ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBio = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bio }),
      });
      if (res.ok) {
        setProfile((p) => ({ ...p, bio }));
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#282a36] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#bd93f9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#282a36] flex items-center justify-center">
        <p className="text-[#6272a4]">User not found</p>
      </div>
    );
  }

  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#282a36] px-4 pt-8 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-[#343746] border border-white/5 rounded-2xl p-8 mb-8 relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#bd93f9]/20 via-[#ff79c6]/20 to-[#8be9fd]/20" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 mt-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center text-3xl font-bold text-[#282a36] shadow-glow-purple flex-shrink-0">
              {profile.username?.[0]?.toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-[#f8f8f2]">
                  {profile.username}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#bd93f9]/15 text-[#bd93f9] font-medium capitalize">
                  {profile.role}
                </span>
              </div>

              {joinDate && (
                <p className="flex items-center gap-1.5 text-sm text-[#6272a4] mb-3">
                  <Calendar size={13} />
                  Joined {joinDate}
                </p>
              )}

              {/* Bio */}
              {editing ? (
                <div className="mb-3">
                  <textarea
                    className="w-full px-3 py-2 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] text-sm resize-none focus:outline-none focus:border-[#bd93f9]/50 h-20 placeholder-[#6272a4]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    maxLength={500}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleUpdateBio}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#bd93f9] text-[#282a36] font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setBio(profile.bio || "");
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#282a36] text-[#6272a4] border border-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#f8f8f2]/60 mb-3">
                  {profile.bio || "No bio yet."}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#f8f8f2]/80">
                  <strong className="text-[#f8f8f2]">
                    {posts.length}
                  </strong>{" "}
                  posts
                </span>
                <span className="text-[#f8f8f2]/80">
                  <strong className="text-[#f8f8f2]">
                    {profile.followers?.length || 0}
                  </strong>{" "}
                  followers
                </span>
                <span className="text-[#f8f8f2]/80">
                  <strong className="text-[#f8f8f2]">
                    {profile.following?.length || 0}
                  </strong>{" "}
                  following
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 sm:mt-0 mt-2">
              {isOwner ? (
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#8be9fd] px-4 py-2 rounded-xl bg-[#8be9fd]/10 hover:bg-[#8be9fd]/20 transition-all duration-300"
                >
                  <Edit3 size={15} /> Edit Profile
                </button>
              ) : user ? (
                <button
                  onClick={handleFollow}
                  className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                    isFollowing
                      ? "text-[#6272a4] bg-[#282a36] border border-white/10 hover:text-[#ff5555] hover:border-[#ff5555]/30"
                      : "text-[#282a36] bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] hover:shadow-glow-purple"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus size={15} /> Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} /> Follow
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Posts */}
        <h2 className="text-lg font-semibold text-[#f8f8f2] mb-4">
          Posts by {profile.username}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6272a4]">No posts yet.</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <div
              key={post._id}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Postcard
                id={post._id}
                title={post.title}
                author={post.author}
                summary={post.summary}
                date={post.createdAt}
                tags={post.tags}
                likes={post.likes?.length}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
