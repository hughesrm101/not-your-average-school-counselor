const dns = require('dns');
const { promisify } = require('util');

const resolve = promisify(dns.resolve4);

// Better domain options for NYASC platform
const betterDomains = [
  // Short & Brandable
  'nyasc.co',
  'nyasc.io', 
  'nyasc.net',
  'nyasc.app',
  'nyasc.store',
  
  // Resource-focused (makes sense)
  'counselor-resources.com',
  'schoolcounselor-resources.com',
  'nyasc-resources.com',
  'counselor-tools.com',
  'schoolcounselor-tools.com',
  'nyasc-tools.com',
  
  // Platform-focused
  'nyasc-platform.com',
  'counselor-platform.com',
  'schoolcounselor-platform.com',
  
  // Store-focused
  'nyasc-store.com',
  'counselor-store.com',
  'schoolcounselor-store.com',
  
  // TPT-focused (since you're on TPT)
  'nyasc-tpt.com',
  'counselor-tpt.com',
  
  // Creative options
  'counselorhub.com',
  'schoolcounselorhub.com',
  'nyasc-hub.com',
  'counselorcentral.com',
  'schoolcounselorcentral.com',
  'nyasc-central.com',
  
  // Professional options
  'counselorpro.com',
  'schoolcounselorpro.com',
  'nyasc-pro.com',
  'counselorexpert.com',
  'schoolcounselorexpert.com',
  
  // Simple & Clean
  'counselor.co',
  'schoolcounselor.co',
  'counselor.io',
  'schoolcounselor.io',
];

async function checkDomain(domain) {
  try {
    await resolve(domain);
    return 'TAKEN';
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ENODATA') {
      return 'AVAILABLE';
    }
    return 'ERROR';
  }
}

async function checkBetterDomains() {
  console.log('🔍 Checking Better Domain Options for NYASC Platform...\n');
  
  const results = {
    available: [],
    taken: [],
    errors: []
  };
  
  for (const domain of betterDomains) {
    const status = await checkDomain(domain);
    
    if (status === 'AVAILABLE') {
      results.available.push(domain);
      console.log(`✅ AVAILABLE ${domain}`);
    } else if (status === 'TAKEN') {
      results.taken.push(domain);
      console.log(`❌ TAKEN ${domain}`);
    } else {
      results.errors.push(domain);
      console.log(`⚠️  ERROR ${domain}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📋 Summary:');
  console.log('===========\n');
  
  console.log('✅ AVAILABLE DOMAINS:');
  results.available.forEach(domain => console.log(`   ${domain}`));
  
  if (results.taken.length > 0) {
    console.log('\n❌ TAKEN DOMAINS:');
    results.taken.forEach(domain => console.log(`   ${domain}`));
  }
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  ERRORS:');
    results.errors.forEach(domain => console.log(`   ${domain}`));
  }
  
  console.log('\n🎯 TOP RECOMMENDATIONS:');
  console.log('======================');
  
  // Categorize recommendations
  const shortBrandable = results.available.filter(d => d.includes('nyasc.') && d.split('.').length === 2);
  const resourceFocused = results.available.filter(d => d.includes('resource'));
  const toolFocused = results.available.filter(d => d.includes('tool'));
  const platformFocused = results.available.filter(d => d.includes('platform'));
  const storeFocused = results.available.filter(d => d.includes('store'));
  const hubFocused = results.available.filter(d => d.includes('hub'));
  const proFocused = results.available.filter(d => d.includes('pro'));
  
  if (shortBrandable.length > 0) {
    console.log('\n🏆 SHORT & BRANDABLE (Best for SEO):');
    shortBrandable.slice(0, 3).forEach(domain => console.log(`   1. ${domain}`));
  }
  
  if (resourceFocused.length > 0) {
    console.log('\n📚 RESOURCE-FOCUSED (Makes sense for your business):');
    resourceFocused.slice(0, 3).forEach(domain => console.log(`   1. ${domain}`));
  }
  
  if (toolFocused.length > 0) {
    console.log('\n🛠️  TOOL-FOCUSED (Professional):');
    toolFocused.slice(0, 3).forEach(domain => console.log(`   1. ${domain}`));
  }
  
  if (platformFocused.length > 0) {
    console.log('\n🏗️  PLATFORM-FOCUSED (Enterprise feel):');
    platformFocused.slice(0, 3).forEach(domain => console.log(`   1. ${domain}`));
  }
  
  if (hubFocused.length > 0) {
    console.log('\n🎯 HUB-FOCUSED (Community feel):');
    hubFocused.slice(0, 3).forEach(domain => console.log(`   1. ${domain}`));
  }
  
  console.log('\n🚀 NEXT STEPS:');
  console.log('==============');
  console.log('1. Choose your favorite domain from the available options');
  console.log('2. Check availability on Namecheap or GoDaddy');
  console.log('3. Purchase your preferred domain');
  console.log('4. Update deployment configuration');
  console.log('5. Deploy your NYASC platform!');
  
  return results;
}

// Run the check
if (require.main === module) {
  checkBetterDomains().catch(console.error);
}

module.exports = { checkBetterDomains };
