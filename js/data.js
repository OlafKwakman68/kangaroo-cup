const HOST_ADDRESS = "1 Bantry Court, Kallaroo WA 6025";

const KANGAROO_CUP = {
  editions: [
    {
      year: 2026,
      dates: "15-18 Oct 2026",
      host: HOST_ADDRESS,
      champion: "",
      rankings: blankRankings(7)
    },
    {
      year: 2025,
      dates: "28-30 Nov 2025",
      host: HOST_ADDRESS,
      champion: "Humberto van den Brok",
      rankings: [
        { rank: 1, name: "Humberto van den Brok", score: "", notes: "" },
        { rank: null, name: "Mack", score: "", notes: "" },
        { rank: null, name: "Bavo", score: "", notes: "" },
        { rank: null, name: "Olaf K", score: "", notes: "" },
        { rank: null, name: "Olaf B", score: "", notes: "" },
        { rank: null, name: "Alex", score: "", notes: "" },
        { rank: null, name: "Flip", score: "", notes: "" },
        { rank: null, name: "Hibbes", score: "", notes: "" }
        ]
    },
    {
      year: 2024,
      dates: "5-8 Dec 2024",
      host: HOST_ADDRESS,
      champion: "Olaf Bluemke",
      rankings: winnerPlusBlank("Olaf Bluemke", 8)
    },
    {
      year: 2023,
      dates: "23-26 Nov 2023",
      host: HOST_ADDRESS,
      champion: "Olaf Kwakman",
      rankings: [
        { rank: 1, name: "Olaf Kwakman", score: "", notes: "" },
        { rank: null, name: "Alex", score: "", notes: "" },
        { rank: null, name: "Toekan", score: "", notes: "" },
        { rank: null, name: "Hibbes", score: "", notes: "" },
        { rank: null, name: "Robbie", score: "", notes: "" },
        { rank: null, name: "Olaf B", score: "", notes: "" },
        { rank: null, name: "Eege", score: "", notes: "" },
        { rank: null, name: "Flip", score: "", notes: "" }
        ]
    },
    {
      year: 2022,
      dates: "21-24 Apr 2022",
      host: HOST_ADDRESS,
      champion: "Jan-Eege Klop",
      rankings: winnerPlusBlank("Jan-Eege Klop", 8)
    }
    ]
};

function blankRankings(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    rows.push({ rank: i, name: "", score: "", notes: "" });
  }
  return rows;
}

function winnerPlusBlank(winnerName, totalPlayers) {
  const rows = [{ rank: 1, name: winnerName, score: "", notes: "" }];
  for (let i = 2; i <= totalPlayers; i++) {
    rows.push({ rank: null, name: "", score: "", notes: "" });
  }
  return rows;
}
