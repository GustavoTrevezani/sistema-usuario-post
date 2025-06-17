"use client"

import { useState, useEffect } from "react"
import { UserForm } from "@/components/user-form"
import { PostForm } from "@/components/post-form"
import { UsersTable } from "@/components/users-table"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface User {
  id: number
  name: string | null
  email: string
  posts: Post[]
}

interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  authorId: number
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUserSaved = () => {
    setEditingUser(null)
    fetchUsers()
  }

  const handlePostSaved = () => {
    setEditingPost(null)
    fetchUsers()
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user and all their posts?")) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchUsers()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to delete user")
      }
    } catch (error) {
      alert("Failed to delete user")
    }
  }

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchUsers()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to delete post")
      }
    } catch (error) {
      alert("Failed to delete post")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">User & Post Management</h1>
            <Button onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">Manage users and their posts with full CRUD operations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            <UserForm
              editingUser={editingUser}
              onUserSaved={handleUserSaved}
              onCancelEdit={() => setEditingUser(null)}
            />
            <PostForm
              users={users}
              editingPost={editingPost}
              onPostSaved={handlePostSaved}
              onCancelEdit={() => setEditingPost(null)}
            />
          </div>

          {/* Right Column - Users Table */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <UsersTable
                users={users}
                onEditUser={setEditingUser}
                onDeleteUser={handleDeleteUser}
                onEditPost={setEditingPost}
                onDeletePost={handleDeletePost}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
