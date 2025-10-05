import { MeiliSearch } from 'meilisearch';
import { BlogPost, Product, Bundle, SearchResult, SearchFilters } from '@/types';

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILI_API_KEY || 'masterKey',
});

// Index names
export const INDEXES = {
  BLOG_POSTS: 'blog_posts',
  PRODUCTS: 'products',
  BUNDLES: 'bundles',
} as const;

// Initialize indexes with settings
export async function initializeIndexes() {
  try {
    // Blog posts index
    await meiliClient.index(INDEXES.BLOG_POSTS).updateSettings({
      searchableAttributes: [
        'title',
        'excerpt',
        'content',
        'categories',
        'tags',
        'grades',
        'authorName',
      ],
      filterableAttributes: [
        'status',
        'categories',
        'tags',
        'grades',
        'publishedAt',
        'featured',
      ],
      sortableAttributes: [
        'publishedAt',
        'createdAt',
        'title',
      ],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
      stopWords: [
        'the',
        'a',
        'an',
        'and',
        'or',
        'but',
        'in',
        'on',
        'at',
        'to',
        'for',
        'of',
        'with',
        'by',
      ],
      synonyms: {
        'sel': ['social emotional learning', 'social-emotional learning'],
        'counseling': ['counselling', 'guidance'],
        'student': ['pupil', 'learner'],
        'teacher': ['educator', 'instructor'],
        'school': ['academy', 'institution'],
        'behavior': ['behaviour'],
        'crisis': ['emergency', 'intervention'],
        'bullying': ['harassment', 'intimidation'],
        'anxiety': ['worry', 'stress'],
        'depression': ['sadness', 'melancholy'],
      },
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
        disableOnWords: [],
        disableOnAttributes: [],
      },
    });

    // Products index
    await meiliClient.index(INDEXES.PRODUCTS).updateSettings({
      searchableAttributes: [
        'title',
        'description',
        'categories',
        'grades',
        'tags',
      ],
      filterableAttributes: [
        'status',
        'categories',
        'grades',
        'tags',
        'price',
        'featured',
        'isBundle',
      ],
      sortableAttributes: [
        'price',
        'createdAt',
        'title',
      ],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
      synonyms: {
        'worksheet': ['activity', 'exercise', 'handout'],
        'lesson': ['activity', 'plan', 'curriculum'],
        'assessment': ['evaluation', 'test', 'quiz'],
        'intervention': ['strategy', 'technique', 'approach'],
        'counseling': ['counselling', 'guidance'],
        'student': ['pupil', 'learner'],
        'teacher': ['educator', 'instructor'],
        'school': ['academy', 'institution'],
      },
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
        disableOnWords: [],
        disableOnAttributes: [],
      },
    });

    // Bundles index
    await meiliClient.index(INDEXES.BUNDLES).updateSettings({
      searchableAttributes: [
        'title',
        'description',
        'categories',
        'grades',
        'tags',
      ],
      filterableAttributes: [
        'status',
        'categories',
        'grades',
        'tags',
        'bundlePrice',
        'featured',
        'isBundle',
      ],
      sortableAttributes: [
        'bundlePrice',
        'createdAt',
        'title',
      ],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
      synonyms: {
        'bundle': ['package', 'collection', 'set'],
        'worksheet': ['activity', 'exercise', 'handout'],
        'lesson': ['activity', 'plan', 'curriculum'],
        'assessment': ['evaluation', 'test', 'quiz'],
        'intervention': ['strategy', 'technique', 'approach'],
        'counseling': ['counselling', 'guidance'],
        'student': ['pupil', 'learner'],
        'teacher': ['educator', 'instructor'],
        'school': ['academy', 'institution'],
      },
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
        disableOnWords: [],
        disableOnAttributes: [],
      },
    });

    console.log('Meilisearch indexes initialized successfully');
  } catch (error) {
    console.error('Error initializing Meilisearch indexes:', error);
    throw error;
  }
}

// Index blog post
export async function indexBlogPost(post: BlogPost) {
  try {
    const document = {
      id: post.postId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.contentMDX || '',
      categories: post.categories,
      tags: post.tags,
      grades: post.grades,
      authorName: post.authorName,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      featured: post.featured || false,
      url: `/blog/${post.slug}`,
      cover: post.cover,
    };

    await meiliClient.index(INDEXES.BLOG_POSTS).addDocuments([document]);
  } catch (error) {
    console.error('Error indexing blog post:', error);
    throw error;
  }
}

// Index product
export async function indexProduct(product: Product) {
  try {
    const document = {
      id: product.productId,
      title: product.title,
      slug: product.slug,
      description: product.description,
      categories: product.categories,
      grades: product.grades,
      tags: product.tags || [],
      status: product.status,
      price: product.price,
      featured: product.featured || false,
      isBundle: product.isBundle,
      createdAt: product.createdAt,
      url: `/shop/${product.slug}`,
      cover: product.cover,
    };

    await meiliClient.index(INDEXES.PRODUCTS).addDocuments([document]);
  } catch (error) {
    console.error('Error indexing product:', error);
    throw error;
  }
}

// Index bundle
export async function indexBundle(bundle: Bundle) {
  try {
    const document = {
      id: bundle.productId,
      title: bundle.title,
      slug: bundle.slug,
      description: bundle.description,
      categories: bundle.categories,
      grades: bundle.grades,
      tags: bundle.tags || [],
      status: bundle.status,
      price: bundle.bundlePrice,
      featured: bundle.featured || false,
      isBundle: true,
      createdAt: bundle.createdAt,
      url: `/shop/${bundle.slug}`,
      cover: bundle.cover,
    };

    await meiliClient.index(INDEXES.BUNDLES).addDocuments([document]);
  } catch (error) {
    console.error('Error indexing bundle:', error);
    throw error;
  }
}

// Delete document from index
export async function deleteFromIndex(indexName: string, documentId: string) {
  try {
    await meiliClient.index(indexName).deleteDocument(documentId);
  } catch (error) {
    console.error('Error deleting from index:', error);
    throw error;
  }
}

// Search across all indexes
export async function searchAll({
  query,
  filters,
  limit = 20,
  offset = 0,
}: {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
}): Promise<{
  results: SearchResult[];
  total: number;
  facets: Record<string, Record<string, number>>;
}> {
  try {
    const searchPromises = [];
    const indexes: any[] = [];

    // Determine which indexes to search
    if (!filters?.type || filters.type === 'all' || filters.type === 'blog') {
      indexes.push(INDEXES.BLOG_POSTS);
    }
    if (!filters?.type || filters.type === 'all' || filters.type === 'products') {
      indexes.push(INDEXES.PRODUCTS);
    }
    if (!filters?.type || filters.type === 'all' || filters.type === 'bundles') {
      indexes.push(INDEXES.BUNDLES);
    }

    // Build search parameters
    const searchParams: any = {
      q: query,
      limit,
      offset,
      attributesToRetrieve: ['*'],
      attributesToHighlight: ['title', 'description', 'excerpt', 'content'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    };

    // Add filters
    if (filters) {
      const filterConditions = [];

      if (filters.categories && filters.categories.length > 0) {
        filterConditions.push(`categories IN [${filters.categories.map(c => `"${c}"`).join(', ')}]`);
      }

      if (filters.grades && filters.grades.length > 0) {
        filterConditions.push(`grades IN [${filters.grades.map(g => `"${g}"`).join(', ')}]`);
      }

      if (filters.tags && filters.tags.length > 0) {
        filterConditions.push(`tags IN [${filters.tags.map(t => `"${t}"`).join(', ')}]`);
      }

      if (filters.priceRange) {
        filterConditions.push(`price >= ${filters.priceRange.min} AND price <= ${filters.priceRange.max}`);
      }

      if (filterConditions.length > 0) {
        searchParams.filter = filterConditions.join(' AND ');
      }

      // Add sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            searchParams.sort = ['createdAt:desc'];
            break;
          case 'oldest':
            searchParams.sort = ['createdAt:asc'];
            break;
          case 'price_low':
            searchParams.sort = ['price:asc'];
            break;
          case 'price_high':
            searchParams.sort = ['price:desc'];
            break;
          case 'relevance':
          default:
            // Default ranking rules apply
            break;
        }
      }
    }

    // Search each index
    for (const indexName of indexes) {
      searchPromises.push(meiliClient.index(indexName).search(query, searchParams));
    }

    const results = await Promise.all(searchPromises);

    // Combine and format results
    const combinedResults: SearchResult[] = [];
    let totalResults = 0;
    const combinedFacets: Record<string, Record<string, number>> = {};

    results.forEach((result, index) => {
      const indexName = indexes[index];
      totalResults += result.estimatedTotalHits || 0;

      // Add type information to results
      const typedResults = result.hits.map((hit: any) => ({
        id: hit.id,
        type: indexName === INDEXES.BLOG_POSTS ? 'blog_post' : 
              indexName === INDEXES.PRODUCTS ? 'product' : 'bundle',
        title: hit.title,
        description: hit.description || hit.excerpt,
        url: hit.url,
        image: hit.cover,
        price: hit.price,
        categories: hit.categories,
        grades: hit.grades,
        tags: hit.tags,
        publishedAt: hit.publishedAt,
        createdAt: hit.createdAt,
        _formatted: hit._formatted,
      }));

      combinedResults.push(...(typedResults as any));

      // Combine facets
      if (result.facetDistribution) {
        Object.entries(result.facetDistribution).forEach(([facet, values]) => {
          if (!combinedFacets[facet]) {
            combinedFacets[facet] = {};
          }
          Object.entries(values as Record<string, number>).forEach(([value, count]) => {
            combinedFacets[facet][value] = (combinedFacets[facet][value] || 0) + count;
          });
        });
      }
    });

    // Sort combined results by relevance (if no specific sort was applied)
    if (!filters?.sortBy || filters.sortBy === 'relevance') {
      combinedResults.sort((a, b) => {
        // Simple relevance scoring based on title match
        const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase());
        const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase());
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
      });
    }

    return {
      results: combinedResults.slice(offset, offset + limit),
      total: totalResults,
      facets: combinedFacets,
    };
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
}

// Search blog posts
export async function searchBlogPosts({
  query,
  filters,
  limit = 20,
  offset = 0,
}: {
  query: string;
  filters?: {
    categories?: string[];
    tags?: string[];
    grades?: string[];
    featured?: boolean;
  };
  limit?: number;
  offset?: number;
}) {
  try {
    const searchParams: any = {
      q: query,
      limit,
      offset,
      filter: 'status = "published"',
    };

    if (filters) {
      const filterConditions = ['status = "published"'];

      if (filters.categories && filters.categories.length > 0) {
        filterConditions.push(`categories IN [${filters.categories.map(c => `"${c}"`).join(', ')}]`);
      }

      if (filters.tags && filters.tags.length > 0) {
        filterConditions.push(`tags IN [${filters.tags.map(t => `"${t}"`).join(', ')}]`);
      }

      if (filters.grades && filters.grades.length > 0) {
        filterConditions.push(`grades IN [${filters.grades.map(g => `"${g}"`).join(', ')}]`);
      }

      if (filters.featured !== undefined) {
        filterConditions.push(`featured = ${filters.featured}`);
      }

      searchParams.filter = filterConditions.join(' AND ');
    }

    const result = await meiliClient.index(INDEXES.BLOG_POSTS).search(query, searchParams);

    return {
      results: result.hits,
      total: result.estimatedTotalHits || 0,
      facets: result.facetDistribution || {},
    };
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw error;
  }
}

// Search products
export async function searchProducts({
  query,
  filters,
  limit = 20,
  offset = 0,
}: {
  query: string;
  filters?: {
    categories?: string[];
    grades?: string[];
    tags?: string[];
    priceRange?: { min: number; max: number };
    featured?: boolean;
  };
  limit?: number;
  offset?: number;
}) {
  try {
    const searchParams: any = {
      q: query,
      limit,
      offset,
      filter: 'status = "active" AND isBundle = false',
    };

    if (filters) {
      const filterConditions = ['status = "active"', 'isBundle = false'];

      if (filters.categories && filters.categories.length > 0) {
        filterConditions.push(`categories IN [${filters.categories.map(c => `"${c}"`).join(', ')}]`);
      }

      if (filters.grades && filters.grades.length > 0) {
        filterConditions.push(`grades IN [${filters.grades.map(g => `"${g}"`).join(', ')}]`);
      }

      if (filters.tags && filters.tags.length > 0) {
        filterConditions.push(`tags IN [${filters.tags.map(t => `"${t}"`).join(', ')}]`);
      }

      if (filters.priceRange) {
        filterConditions.push(`price >= ${filters.priceRange.min} AND price <= ${filters.priceRange.max}`);
      }

      if (filters.featured !== undefined) {
        filterConditions.push(`featured = ${filters.featured}`);
      }

      searchParams.filter = filterConditions.join(' AND ');
    }

    const result = await meiliClient.index(INDEXES.PRODUCTS).search(query, searchParams);

    return {
      results: result.hits,
      total: result.estimatedTotalHits || 0,
      facets: result.facetDistribution || {},
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

// Search bundles
export async function searchBundles({
  query,
  filters,
  limit = 20,
  offset = 0,
}: {
  query: string;
  filters?: {
    categories?: string[];
    grades?: string[];
    tags?: string[];
    priceRange?: { min: number; max: number };
    featured?: boolean;
  };
  limit?: number;
  offset?: number;
}) {
  try {
    const searchParams: any = {
      q: query,
      limit,
      offset,
      filter: 'status = "active" AND isBundle = true',
    };

    if (filters) {
      const filterConditions = ['status = "active"', 'isBundle = true'];

      if (filters.categories && filters.categories.length > 0) {
        filterConditions.push(`categories IN [${filters.categories.map(c => `"${c}"`).join(', ')}]`);
      }

      if (filters.grades && filters.grades.length > 0) {
        filterConditions.push(`grades IN [${filters.grades.map(g => `"${g}"`).join(', ')}]`);
      }

      if (filters.tags && filters.tags.length > 0) {
        filterConditions.push(`tags IN [${filters.tags.map(t => `"${t}"`).join(', ')}]`);
      }

      if (filters.priceRange) {
        filterConditions.push(`price >= ${filters.priceRange.min} AND price <= ${filters.priceRange.max}`);
      }

      if (filters.featured !== undefined) {
        filterConditions.push(`featured = ${filters.featured}`);
      }

      searchParams.filter = filterConditions.join(' AND ');
    }

    const result = await meiliClient.index(INDEXES.BUNDLES).search(query, searchParams);

    return {
      results: result.hits,
      total: result.estimatedTotalHits || 0,
      facets: result.facetDistribution || {},
    };
  } catch (error) {
    console.error('Error searching bundles:', error);
    throw error;
  }
}

// Get search suggestions
export async function getSearchSuggestions(query: string, limit = 5): Promise<string[]> {
  try {
    const suggestions: string[] = [];
    
    // Search for suggestions in all indexes
    const searchPromises = [
      meiliClient.index(INDEXES.BLOG_POSTS).search(query, { limit: 3 }),
      meiliClient.index(INDEXES.PRODUCTS).search(query, { limit: 3 }),
      meiliClient.index(INDEXES.BUNDLES).search(query, { limit: 3 }),
    ];

    const results = await Promise.all(searchPromises);

    results.forEach(result => {
      result.hits.forEach((hit: any) => {
        if (hit.title && !suggestions.includes(hit.title)) {
          suggestions.push(hit.title);
        }
      });
    });

    return suggestions.slice(0, limit);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
}

// Get popular search terms
export async function getPopularSearchTerms(limit = 10): Promise<string[]> {
  try {
    // This would typically be stored in a separate analytics system
    // For now, return some common terms
    return [
      'social emotional learning',
      'counseling activities',
      'bullying prevention',
      'anxiety management',
      'crisis intervention',
      'student assessment',
      'behavior management',
      'parent communication',
      'college readiness',
      'career guidance',
    ].slice(0, limit);
  } catch (error) {
    console.error('Error getting popular search terms:', error);
    return [];
  }
}

// Clear all indexes
export async function clearAllIndexes() {
  try {
    await Promise.all([
      meiliClient.index(INDEXES.BLOG_POSTS).deleteAllDocuments(),
      meiliClient.index(INDEXES.PRODUCTS).deleteAllDocuments(),
      meiliClient.index(INDEXES.BUNDLES).deleteAllDocuments(),
    ]);
    console.log('All indexes cleared successfully');
  } catch (error) {
    console.error('Error clearing indexes:', error);
    throw error;
  }
}

// Get index stats
export async function getIndexStats() {
  try {
    const stats = await Promise.all([
      meiliClient.index(INDEXES.BLOG_POSTS).getStats(),
      meiliClient.index(INDEXES.PRODUCTS).getStats(),
      meiliClient.index(INDEXES.BUNDLES).getStats(),
    ]);

    return {
      blogPosts: stats[0],
      products: stats[1],
      bundles: stats[2],
    };
  } catch (error) {
    console.error('Error getting index stats:', error);
    throw error;
  }
}
