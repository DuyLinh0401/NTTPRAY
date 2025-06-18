import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState("");
  const [prayer, setPrayer] = useState("");
  const [showVideo, setShowVideo] = useState(false);

useEffect(() => {
  // Hiệu ứng khói khi click
  const handleClick = (e) => {
    const smokeLayers = 3;
    for (let i = 0; i < smokeLayers; i++) {
      const smoke = document.createElement("div");
      smoke.className = "smoke";
      const size = 150 + i * 60;
      const opacity = 0.6 - i * 0.1;

      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.left = `${e.clientX - size / 2}px`;
      smoke.style.top = `${e.clientY - size / 2}px`;
      smoke.style.background = `radial-gradient(circle, rgba(10,10,10,${opacity}) 0%, rgba(0,0,0,0) 80%)`;

      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 4000);
    }
  };

   // Hiệu ứng hoa rơi
  const createFlower = () => {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerText = "🌸";
    flower.style.left = `${Math.random() * window.innerWidth}px`;
    flower.style.animationDuration = `${8 + Math.random() * 4}s`;
    flower.style.fontSize = `${20 + Math.random() * 10}px`;
    flower.style.opacity = `${0.5 + Math.random() * 0.5}`;
    flower.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 7000);
  };

  window.addEventListener("click", handleClick);
  const flowerInterval = setInterval(createFlower, 1500);

  return () => {
    window.removeEventListener("click", handleClick);
    clearInterval(flowerInterval);
  };
}, []);
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.innerText = "L";

  const handlePray = () => {
  if (name.trim() && prayer.trim()) {
    setPrayers([...prayers, { name, prayer }]);
    setShowVideo(true);
    setName("");
    setPrayer("");
  } else {
    alert("Vui lòng nhập đầy đủ họ tên và lời cầu nguyện!");
  }
};

  return (
    <div className="container">
      {!showVideo ? (
        <img src="/PASS.png" alt="altar" className="altar-image" />
      ) : (
        <>
          <video src="/PASS.mp4" autoPlay muted playsInline onEnded={(e) => {
    e.target.pause(); // giữ nguyên khung hình cuối
  }} className="altar-video" />
          <audio src="/caunguyen.mp3" autoPlay loop />
        </>
      )}

      <div className="form">
        <input
          type="text"
          placeholder="Người cầu nguyện"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Lời cầu nguyện"
          value={prayer}
          onChange={(e) => setPrayer(e.target.value)}
        />
        <button onClick={handlePray}>Thắp hương</button>
      </div>

      {prayers.length > 0 && (
  <div className="scroll-container">
    <img src="/caunguyen.png" alt="Scroll" className="scroll-background" />
    <div className="scroll-text">
      <h2>Lời cầu nguyện của {prayers[prayers.length - 1].name} đã được gửi</h2>
      <p>
  {prayers[prayers.length - 1].prayer
    .split(" ")
    .reduce((acc, word, i) => {
      const lineIndex = Math.floor(i / 6);
      if (!acc[lineIndex]) acc[lineIndex] = [];
      acc[lineIndex].push(word);
      return acc;
    }, [])
    .map((line, idx) => (
      <span key={idx}>
        {line.join(" ")}<br />
      </span>
    ))}
</p>

    </div>
  </div>
)}

    </div>
  );
}

export default App;
