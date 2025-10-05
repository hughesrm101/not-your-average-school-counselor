import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  status: 'draft' | 'published' | 'scheduled'
  publishedAt?: string
  views: number
  category: string
  tags: string[]
}

interface RecentPostsProps {
  posts?: BlogPost[]
}

export default function RecentPosts({ posts = [] }: RecentPostsProps) {
  // Mock data for now
  const mockPosts: BlogPost[] = [
    {
      id: 'post_1',
      title: 'Building Strong Relationships with Students',
      status: 'published',
      publishedAt: '2024-01-15T08:00:00Z',
      views: 245,
      category: 'Relationships',
      tags: ['students', 'communication', 'trust']
    },
    {
      id: 'post_2',
      title: 'Creating Effective Study Habits',
      status: 'scheduled',
      publishedAt: '2024-01-20T09:00:00Z',
      views: 0,
      category: 'Academic Support',
      tags: ['study', 'habits', 'organization']
    },
    {
      id: 'post_3',
      title: 'Managing Stress in High School',
      status: 'draft',
      views: 0,
      category: 'Mental Health',
      tags: ['stress', 'anxiety', 'coping']
    }
  ]

  const displayPosts = posts.length > 0 ? posts : mockPosts

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Blog Posts</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/blog">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayPosts.map((post) => (
            <div key={post.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900 line-clamp-2">{post.title}</h4>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{post.category}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.views} views</span>
                    {post.publishedAt && (
                      <>
                        <span>•</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Edit className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
