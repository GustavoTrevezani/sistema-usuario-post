"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

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

interface UsersTableProps {
  users: User[]
  onEditUser: (user: User) => void
  onDeleteUser: (userId: number) => void
  onEditPost: (post: Post) => void
  onDeletePost: (postId: number) => void
}

export function UsersTable({ users, onEditUser, onDeleteUser, onEditPost, onDeletePost }: UsersTableProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users & Posts</h2>
      {users.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No users found. Create your first user to get started.
          </CardContent>
        </Card>
      ) : (
        users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{user.name || "Unnamed User"}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEditUser(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Posts ({user.posts.length})</h4>
                </div>
                {user.posts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No posts yet.</p>
                ) : (
                  <div className="space-y-2">
                    {user.posts.map((post) => (
                      <div key={post.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{post.title}</h5>
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                          {post.content && <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>}
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button size="sm" variant="ghost" onClick={() => onEditPost(post)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => onDeletePost(post.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
