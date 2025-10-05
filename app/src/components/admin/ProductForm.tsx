'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// Using regular HTML checkboxes instead of custom components
import { Upload, X, Plus, Save, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface ProductFormData {
  name: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  status: 'draft' | 'active' | 'archived'
  category: string
  subcategory?: string
  grades: string[]
  tags: string[]
  file: File | null
  previewImages: File[]
  seoTitle?: string
  seoDescription?: string
  isDigital: boolean
  isBundled: boolean
  bundleItems?: string[]
  downloadLimit?: number
  expiresAt?: string
  featured: boolean
  newRelease: boolean
  bestSeller: boolean
}

const GRADES = [
  'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
  '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade',
  '9th Grade', '10th Grade', '11th Grade', '12th Grade', 'All Grades'
]

const CATEGORIES = [
  'Social Emotional Learning',
  'Academic Support',
  'Behavior Management',
  'College & Career',
  'Crisis Intervention',
  'Group Counseling',
  'Individual Counseling',
  'Parent Resources',
  'Professional Development',
  'Assessment & Evaluation'
]

const TAGS = [
  'anxiety', 'depression', 'friendship', 'bullying', 'self-esteem',
  'anger management', 'conflict resolution', 'mindfulness', 'coping skills',
  'study skills', 'organization', 'time management', 'goal setting',
  'career exploration', 'college prep', 'financial literacy', 'life skills'
]

export default function ProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    shortDescription: '',
    price: 0,
    compareAtPrice: undefined,
    status: 'draft',
    category: '',
    subcategory: '',
    grades: [],
    tags: [],
    file: null,
    previewImages: [],
    seoTitle: '',
    seoDescription: '',
    isDigital: true,
    isBundled: false,
    bundleItems: [],
    downloadLimit: undefined,
    expiresAt: '',
    featured: false,
    newRelease: false,
    bestSeller: false
  })

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({ 
      ...prev, 
      previewImages: [...prev.previewImages, ...files] 
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      previewImages: prev.previewImages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('description', formData.description)
      submitData.append('shortDescription', formData.shortDescription)
      submitData.append('price', formData.price.toString())
      submitData.append('status', formData.status)
      submitData.append('category', formData.category)
      submitData.append('grades', JSON.stringify(formData.grades))
      submitData.append('tags', JSON.stringify(formData.tags))
      submitData.append('isDigital', formData.isDigital.toString())
      submitData.append('featured', formData.featured.toString())
      submitData.append('newRelease', formData.newRelease.toString())
      submitData.append('bestSeller', formData.bestSeller.toString())

      if (formData.file) {
        submitData.append('file', formData.file)
      }

      formData.previewImages.forEach((image, index) => {
        submitData.append(`previewImage_${index}`, image)
      })

      // Submit to API
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        toast.success('Product created successfully!')
        router.push('/admin/products')
      } else {
        throw new Error('Failed to create product')
      }
    } catch (error) {
      toast.error('Failed to create product. Please try again.')
      console.error('Error creating product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Making Friends & Keeping Them"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                placeholder="4.50"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              placeholder="Brief description for product cards and previews"
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of the product, what's included, how to use it, etc."
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>Target Audience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Grade Levels</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
              {GRADES.map((grade) => (
                <label key={grade} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.grades.includes(grade)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('grades', [...formData.grades, grade])
                      } else {
                        handleInputChange('grades', formData.grades.filter(g => g !== grade))
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm">{grade}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {TAGS.map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('tags', [...formData.tags, tag])
                      } else {
                        handleInputChange('tags', formData.tags.filter(t => t !== tag))
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Product Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="file">Main Product File *</Label>
            <div className="mt-2">
              <input
                id="file"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.file && (
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="secondary">{formData.file.name}</Badge>
                  <span className="text-sm text-gray-500">
                    ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="previewImages">Preview Images</Label>
            <div className="mt-2">
              <input
                id="previewImages"
                type="file"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {formData.previewImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.previewImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Badge variant="outline" className="pr-6">
                        {image.name}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Product Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span>Featured Product</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.newRelease}
                onChange={(e) => handleInputChange('newRelease', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span>New Release</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.bestSeller}
                onChange={(e) => handleInputChange('bestSeller', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span>Best Seller</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Preview functionality
            toast.info('Preview functionality coming soon!')
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </form>
  )
}
