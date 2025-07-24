"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Search, Star, Download, Heart, TrendingUp, Filter, Users, Code, Sparkles } from "lucide-react"

const marketplaceComponents = [
  {
    id: 1,
    name: "Modern Dashboard Card",
    description: "Beautiful analytics card with charts and metrics",
    author: "Sarah Chen",
    price: 12,
    rating: 4.9,
    downloads: 2847,
    tags: ["dashboard", "analytics", "charts"],
    preview: "/placeholder.svg?height=200&width=300&text=Dashboard+Card",
    featured: true,
  },
  {
    id: 2,
    name: "Animated Login Form",
    description: "Sleek login form with smooth animations",
    author: "Mike Johnson",
    price: 8,
    rating: 4.7,
    downloads: 1923,
    tags: ["form", "animation", "auth"],
    preview: "/placeholder.svg?height=200&width=300&text=Login+Form",
    featured: false,
  },
  {
    id: 3,
    name: "E-commerce Product Card",
    description: "Product showcase with image gallery and details",
    author: "Emma Wilson",
    price: 15,
    rating: 4.8,
    downloads: 3156,
    tags: ["ecommerce", "product", "gallery"],
    preview: "/placeholder.svg?height=200&width=300&text=Product+Card",
    featured: true,
  },
  {
    id: 4,
    name: "Interactive Timeline",
    description: "Responsive timeline component with animations",
    author: "David Kim",
    price: 0, // Free
    rating: 4.6,
    downloads: 5432,
    tags: ["timeline", "animation", "responsive"],
    preview: "/placeholder.svg?height=200&width=300&text=Timeline",
    featured: false,
  },
]

export function ComponentMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredComponents = marketplaceComponents.filter(
    (component) =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Component Marketplace</h1>
              <p className="text-gray-600">Discover and share amazing React components</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Sparkles className="h-4 w-4 mr-2" />
            Publish Component
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1,247</div>
                  <div className="text-sm text-gray-600">Components</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-sm text-gray-600">Contributors</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">45.2k</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">4.8</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <Card key={component.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={component.preview || "/placeholder.svg"}
                      alt={component.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {component.featured && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600">
                        Featured
                      </Badge>
                    )}
                    <Button size="sm" variant="outline" className="absolute top-2 right-2 bg-white/90">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <div className="text-right">
                        {component.price === 0 ? (
                          <Badge variant="secondary">Free</Badge>
                        ) : (
                          <div className="font-bold text-green-600">${component.price}</div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{component.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4 text-blue-500" />
                          <span>{component.downloads.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>by {component.author}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {component.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1" size="sm">
                          <Code className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {component.price === 0 ? "Download" : "Buy"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents
                .filter((c) => c.featured)
                .map((component) => (
                  <Card key={component.id} className="hover:shadow-lg transition-shadow border-2 border-purple-200">
                    <div className="relative">
                      <img
                        src={component.preview || "/placeholder.svg"}
                        alt={component.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600">
                        Featured
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <p className="text-sm text-gray-600">{component.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{component.rating}</span>
                        </div>
                        <div className="font-bold text-green-600">
                          {component.price === 0 ? "Free" : `$${component.price}`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="free">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents
                .filter((c) => c.price === 0)
                .map((component) => (
                  <Card key={component.id} className="hover:shadow-lg transition-shadow border-2 border-green-200">
                    <div className="relative">
                      <img
                        src={component.preview || "/placeholder.svg"}
                        alt={component.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-green-600">Free</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <p className="text-sm text-gray-600">{component.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4 text-blue-500" />
                          <span>{component.downloads.toLocaleString()}</span>
                        </div>
                        <Button size="sm">Download Free</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Trending This Week</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComponents
                  .sort((a, b) => b.downloads - a.downloads)
                  .map((component) => (
                    <Card key={component.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={component.preview || "/placeholder.svg"}
                          alt={component.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-orange-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <p className="text-sm text-gray-600">{component.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{component.rating}</span>
                          </div>
                          <div className="font-bold text-green-600">
                            {component.price === 0 ? "Free" : `$${component.price}`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
