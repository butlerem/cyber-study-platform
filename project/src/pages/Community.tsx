import React, { useEffect, useState } from "react";
import { Users, MessageSquare, HeartHandshake } from "lucide-react";

function Community() {
  const [count, setCount] = useState(0);
  const finalCount = 243; // Replace this with a dynamic value from your backend if needed

  useEffect(() => {
    let start = 0;
    const end = finalCount;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 10);

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [finalCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold glow mb-6">Join the Community</h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Collaborate, learn, and grow with fellow cybersecurity enthusiasts.
          Whether you're a seasoned hacker or just starting out, you're welcome
          here.
        </p>
      </div>

      {/* Animated Member Counter */}
      <div className="mb-20 text-center">
        <div className="text-6xl font-bold text-[#9580FF] tracking-widest mb-4 glow transition-all">
          {count}+
        </div>
        <p className="text-lg text-gray-400">
          Hackers and learners have already joined. What are you waiting for?
        </p>
      </div>

      {/* Community Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: <Users className="w-10 h-10 text-[#9580FF] mx-auto mb-4" />,
            title: "Collaborative Learning",
            desc: "Ask questions, get help, and work together on solving tough challenges in real-time.",
          },
          {
            icon: (
              <MessageSquare className="w-10 h-10 text-[#9580FF] mx-auto mb-4" />
            ),
            title: "Live Discussions",
            desc: "Join active threads about tools, writeups, challenge walkthroughs, and news in security.",
          },
          {
            icon: (
              <HeartHandshake className="w-10 h-10 text-[#9580FF] mx-auto mb-4" />
            ),
            title: "Mentorship Friendly",
            desc: "New to hacking? Get advice from experienced members and find mentorship opportunities.",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="gradient-border">
            <div className="bg-[#080810] p-8 rounded-lg text-center transform hover:scale-105 transition-all">
              {icon}
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Join Now CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Our community lives on Discord. Join the conversation, share your
          knowledge, and grow your network.
        </p>
        <a
          href="https://your-discord-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#9580FF] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#6E54C8] transition"
        >
          Join the Discord
        </a>
      </div>
    </div>
  );
}

export default Community;
