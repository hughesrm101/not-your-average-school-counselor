#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Setting up Meilisearch for NYASC...\n');

console.log('📋 Meilisearch Cloud Setup:');
console.log('1. Go to https://cloud.meilisearch.com/');
console.log('2. Create a new account or sign in');
console.log('3. Create a new project');
console.log('4. Get your API key and host URL\n');

console.log('⚙️  Required Configuration:');
console.log('1. Host URL (e.g., https://your-project.meilisearch.io)');
console.log('2. API Key (starts with your-project-key)');
console.log('3. Index names: products, blog-posts, bundles\n');

// Create Meilisearch configuration
const meilisearchConfig = `// Meilisearch Configuration for NYASC
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'https://your-project.meilisearch.io',
  apiKey: process.env.MEILISEARCH_API_KEY || 'your-api-key',
});

// Index configurations
export const indexes = {
  products: {
    name: 'products',
    primaryKey: 'id',
    searchableAttributes: ['name', 'description', 'tags', 'category'],
    filterableAttributes: ['category', 'gradeLevel', 'price', 'status'],
    sortableAttributes: ['price', 'createdAt', 'name'],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness'
    ],
    stopWords: ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
  },
  
  blogPosts: {
    name: 'blog-posts',
    primaryKey: 'id',
    searchableAttributes: ['title', 'excerpt', 'content', 'tags', 'author'],
    filterableAttributes: ['status', 'tags', 'author', 'publishedAt'],
    sortableAttributes: ['publishedAt', 'title', 'readingTime'],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness'
    ],
    stopWords: ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
  },
  
  bundles: {
    name: 'bundles',
    primaryKey: 'id',
    searchableAttributes: ['name', 'description', 'category'],
    filterableAttributes: ['category', 'status', 'price'],
    sortableAttributes: ['price', 'createdAt', 'name'],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness'
    ]
  }
};

// Initialize indexes
export async function initializeIndexes() {
  try {
    for (const [key, config] of Object.entries(indexes)) {
      const index = client.index(config.name);
      
      // Set searchable attributes
      await index.updateSearchableAttributes(config.searchableAttributes);
      
      // Set filterable attributes
      await index.updateFilterableAttributes(config.filterableAttributes);
      
      // Set sortable attributes
      await index.updateSortableAttributes(config.sortableAttributes);
      
      // Set ranking rules
      await index.updateRankingRules(config.rankingRules);
      
      // Set stop words
      if (config.stopWords) {
        await index.updateStopWords(config.stopWords);
      }
      
      console.log(\`✅ Index \${config.name} configured\`);
    }
  } catch (error) {
    console.error('❌ Error initializing indexes:', error);
  }
}

// Search functions
export async function searchProducts(query, filters = {}) {
  const index = client.index('products');
  return await index.search(query, {
    filter: Object.entries(filters)
      .map(([key, value]) => \`\${key} = \${value}\`)
      .join(' AND '),
    limit: 20,
    offset: 0
  });
}

export async function searchBlogPosts(query, filters = {}) {
  const index = client.index('blog-posts');
  return await index.search(query, {
    filter: Object.entries(filters)
      .map(([key, value]) => \`\${key} = \${value}\`)
      .join(' AND '),
    limit: 20,
    offset: 0
  });
}

export async function searchBundles(query, filters = {}) {
  const index = client.index('bundles');
  return await index.search(query, {
    filter: Object.entries(filters)
      .map(([key, value]) => \`\${key} = \${value}\`)
      .join(' AND '),
    limit: 20,
    offset: 0
  });
}

// Index data functions
export async function indexProduct(product) {
  const index = client.index('products');
  return await index.addDocuments([product]);
}

export async function indexBlogPost(post) {
  const index = client.index('blog-posts');
  return await index.addDocuments([post]);
}

export async function indexBundle(bundle) {
  const index = client.index('bundles');
  return await index.addDocuments([bundle]);
}

// Bulk index functions
export async function bulkIndexProducts(products) {
  const index = client.index('products');
  return await index.addDocuments(products);
}

export async function bulkIndexBlogPosts(posts) {
  const index = client.index('blog-posts');
  return await index.addDocuments(posts);
}

export async function bulkIndexBundles(bundles) {
  const index = client.index('bundles');
  return await index.addDocuments(bundles);
}

export default client;
`;

fs.writeFileSync('src/lib/meilisearch.ts', meilisearchConfig);
console.log('✅ Meilisearch configuration created');

console.log('\n🎯 Next Steps:');
console.log('1. Update your .env.production with Meilisearch credentials');
console.log('2. Run: npm run seed-search-data');
console.log('3. Test search functionality');
console.log('4. Configure search filters and facets\n');

console.log('🔗 Useful Links:');
console.log('- Meilisearch Cloud: https://cloud.meilisearch.com/');
console.log('- Meilisearch Docs: https://docs.meilisearch.com/');
console.log('- Search API: https://docs.meilisearch.com/reference/api/search.html');
