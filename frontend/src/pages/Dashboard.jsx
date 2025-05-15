import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ping")
      .then((res) => console.log("✅ Server says:", res.data))
      .catch((err) => console.error("❌ Connection failed", err));
  }, []);

  return (
    <div className="bg-rose-silk min-h-screen px-6 py-10 font-clean animate-fade-in">
      <h1 className="text-4xl font-elegant text-plum mb-8 animate-slide-up">
        Your Sanctuary
      </h1>

      {/* Daily Routine Overview */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-elegant text-plum mb-2">Today's Ritual</h2>
        <p className="text-rose-mauve mb-2">You're 60% through your routine ✨</p>
        <div className="w-full bg-rose-blush rounded-full h-3 mb-2">
          <div className="bg-plum h-3 rounded-full" style={{ width: "60%" }}></div>
        </div>
        <p className="italic text-sm text-rose-mauve">
          “Your skin speaks poetry – every glow a stanza.”
        </p>
      </div>

      {/* Journal Preview */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-elegant text-plum mb-2">Recent Reflections</h2>
        <ul className="text-rose-mauve space-y-1 text-sm">
          <li>📝 13 May - “Felt refreshed after that green tea toner...”</li>
          <li>📝 12 May - “Reminder to patch test new serum!”</li>
        </ul>
        <Link
          to="/journal"
          className="text-plum underline text-sm mt-2 inline-block"
        >
          See all entries
        </Link>
      </div>

      {/* Routine Consistency */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-elegant text-plum mb-2">Routine Streak</h2>
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-rose-mauve">
          <span>Mon ✅</span>
          <span>Tue ✅</span>
          <span>Wed ✅</span>
          <span>Thu ✅</span>
          <span>Fri ⏳</span>
          <span>Sat ❌</span>
          <span>Sun —</span>
        </div>
      </div>

      {/* Seasonal Tip */}
      <div className="bg-rose-petal border-l-4 border-gold p-4 rounded-lg shadow-inner mb-8">
        <p className="text-plum font-elegant">🌞 Tip for Summer:</p>
        <p className="text-rose-mauve text-sm">
          Lightweight gels keep pores happy and hydrated without feeling heavy.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/routine"
          className="bg-plum text-white px-5 py-2 rounded-full hover:bg-opacity-80 transition-all"
        >
          Log Routine
        </Link>
        <Link
          to="/journal"
          className="border border-plum text-plum px-5 py-2 rounded-full hover:bg-rose-blush"
        >
          Write Journal
        </Link>
        <Link
          to="/product-checker"
          className="bg-gold text-white px-5 py-2 rounded-full hover:opacity-90"
        >
          Check Ingredient
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
