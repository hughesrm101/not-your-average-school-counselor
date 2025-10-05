const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

const domains = [
  'notyouraverageschoolcounselor.com',
  'nyasc.com',
  'nyasc-counselor.com',
  'notyouraverageschoolcounselor.org',
  'nyasc-resources.com',
  'schoolcounselor-resources.com',
  'nyasc-tools.com',
  'counselor-resources.com',
  'nyasc-platform.com',
  'schoolcounselor-tools.com',
  'nyasc.co',
  'nyasc.io',
  'nyasc.net',
  'nyasc-tpt.com',
  'nyasc-store.com'
];

async function checkDomain(domain) {
  try {
    // Use whois to check domain availability
    const { stdout, stderr } = await execAsync(`whois ${domain}`);
    
    // Check for common "not found" indicators
    const notFoundIndicators = [
      'No match for',
      'Not found',
      'No entries found',
      'No data found',
      'Status: free',
      'No matching record'
    ];
    
    const isAvailable = notFoundIndicators.some(indicator => 
      stdout.toLowerCase().includes(indicator.toLowerCase())
    );
    
    return {
      domain,
      available: isAvailable,
      status: isAvailable ? '✅ AVAILABLE' : '❌ TAKEN'
    };
  } catch (error) {
    // If whois fails, assume it might be available
    return {
      domain,
      available: true,
      status: '✅ LIKELY AVAILABLE (check manually)'
    };
  }
}

async function checkAllDomains() {
  console.log('🔍 Checking Domain Availability for NYASC Platform...\n');
  
  const results = [];
  
  for (const domain of domains) {
    const result = await checkDomain(domain);
    results.push(result);
    console.log(`${result.status} ${result.domain}`);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Summary:');
  console.log('===========');
  
  const available = results.filter(r => r.available);
  const taken = results.filter(r => !r.available);
  
  if (available.length > 0) {
    console.log('\n✅ AVAILABLE DOMAINS:');
    available.forEach(result => {
      console.log(`   ${result.domain}`);
    });
  }
  
  if (taken.length > 0) {
    console.log('\n❌ TAKEN DOMAINS:');
    taken.forEach(result => {
      console.log(`   ${result.domain}`);
    });
  }
  
  console.log('\n🎯 RECOMMENDATIONS:');
  console.log('==================');
  
  if (available.length > 0) {
    console.log('1. Check the available domains manually at:');
    console.log('   https://www.namecheap.com/domains/domain-name-search/');
    console.log('\n2. Top picks from available domains:');
    available.slice(0, 3).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.domain}`);
    });
  } else {
    console.log('All checked domains appear to be taken.');
    console.log('Try these alternatives:');
    console.log('   - Add numbers: nyasc2024.com');
    console.log('   - Add location: nyasc-usa.com');
    console.log('   - Add descriptor: nyasc-resources.com');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Verify availability on Namecheap or GoDaddy');
  console.log('2. Purchase your preferred domain');
  console.log('3. Configure DNS to point to your hosting');
  console.log('4. Deploy your NYASC platform!');
}

// Run the check
if (require.main === module) {
  checkAllDomains().catch(console.error);
}

module.exports = { checkAllDomains, checkDomain };
